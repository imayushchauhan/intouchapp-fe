import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {
  MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule,
  MatTableModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ContactsComponent} from './contacts/contacts.component';
import {RouterModule, Routes} from '@angular/router';
import { UsersComponent } from './users/users.component';
import {DataService} from './data.service';
import { AddUserComponent } from './add-user/add-user.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    UsersComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatChipsModule,
    MatListModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
