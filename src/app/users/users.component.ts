import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material';
import {DataService} from '../data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http: HttpClient, private data: DataService) {
  }

  displayedColumns = ['position', 'database', 'userName', 'email', 'phoneNumber', 'contactsAndPotentialMergeCandidates'];

  dataSource = new MatTableDataSource();

  userList = [];

  getSelectedUser = function (user) {
    const contactList = [];
    for (const contactName in user.contactList) {
      const contactObj = {};
      contactObj['contactName'] = contactName;
      contactObj['contactDetail'] = user.contactList[contactName];
      contactList.push(contactObj);
    }
    user.contactList = contactList;
    this.data.changeData(user);
  };

  ngOnInit(): void {
    this.http.post('http://127.0.0.1:8000/api/get-user-list', {}, {
      // headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(
      data => {
        console.log(data);
        if (data['code'] !== 200) {
          alert('Something went wrong!');
        }

        this.userList = data['responseData'];
        for (let index = 0; index < this.userList.length; index++) {
          this.userList[index]['position'] = index + 1;
          if (this.userList[index]['_id'].charAt(0) === '1') {
            this.userList[index]['database'] = 'in_touch_app_one';
          } else {
            this.userList[index]['database'] = 'in_touch_app_two';
          }
        }

        this.dataSource = new MatTableDataSource(this.userList);
      },
      err => {
        alert('Something went wrong!');
      }
    );
  }
}
