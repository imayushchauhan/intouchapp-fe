import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private http: HttpClient, private location: Location) {
  }

  user = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };

  addUser = function (user) {
    console.log(user);
    this.http.post('http://127.0.0.1:8000/api/save-user', JSON.stringify(user), {
      // headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(
      data => {
        console.log(data);
        if (data['code'] !== 200) {
          alert('Something went wrong!');
        }

        this.location.back();
      },
      err => {
        alert('Something went wrong!');
      }
    );
  };

  ngOnInit() {
  }

}
