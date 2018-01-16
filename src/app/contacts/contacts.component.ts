import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Location} from '@angular/common';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private http: HttpClient, private data: DataService, private location: Location) {
  }

  isAddContact = false;

  contactName = '';

  contactInfoList = [{
    contactInfoType: [
      {value: 'email', viewValue: 'email'},
      {value: 'phone', viewValue: 'phone'}
    ],
    contactInfoValue: ''
  }];

  selectedUser = {};

  contactList = {};

  potentialMergeCandidatesList = [];

  addContact = function () {
    this.isAddContact = !this.isAddContact;
  };

  addContactInfo = function () {
    this.contactInfoList.push({
      contactInfoType: [
        {value: 'email', viewValue: 'email'},
        {value: 'phone', viewValue: 'phone'}
      ],
      contactInfoValue: ''
    });
  };

  saveContact = function (contactName, contactInfoList) {
    if (this.selectedUser._id === '') {
      return;
    }

    console.log(this.selectedUser.contactList);

    const tempContactList = [];
    for (let index = 0; index < contactInfoList.length; index++) {
      tempContactList.push({value: contactInfoList[index].contactInfoValue, type: 'email'});
    }

    this.contactList[contactName] = tempContactList;

    const requestData = {};
    requestData['_id'] = this.selectedUser._id;
    requestData['firstName'] = this.selectedUser.firstName;
    requestData['lastName'] = this.selectedUser.lastName;
    requestData['email'] = this.selectedUser.email;
    requestData['phoneNumber'] = this.selectedUser.phoneNumber;
    requestData['contactList'] = this.contactList;

    if (this.selectedUser.contactList.length > 0) {
      for (let index = 0; index < this.selectedUser.contactList.length; index++) {
        requestData['contactList'][this.selectedUser.contactList[index].contactName] = this.selectedUser.contactList[index].contactDetail;
      }
    }
    console.log(requestData);
    this.http.post('http://127.0.0.1:8000/api/update-user', JSON.stringify(requestData), {
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


  ngOnInit(): void {
    this.data.currentData.subscribe(selectedUser => {
      this.selectedUser = selectedUser;
      if (this.selectedUser['_id'] === '' || this.selectedUser['contactList'].length === 0) {
        return;
      }

      const requestData = {};
      requestData['userID'] = selectedUser._id;
      this.http.post('http://127.0.0.1:8000/api/get-potential-merge-candidates', JSON.stringify(requestData), {
        // headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe(
        data => {
          console.log(data);
          if (data['code'] !== 200) {
            alert('Something went wrong!');
          }

          this.potentialMergeCandidatesList = data['responseData'];
        },
        err => {
          alert('Something went wrong!');
        }
      );
    });
  }
}
