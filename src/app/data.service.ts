import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  constructor() {}

  // private data = new BehaviorSubject();
  private data = new BehaviorSubject({_id: '', contactList: []});

  currentData = this.data.asObservable();

  changeData(data) {
    this.data.next(data);
  }
}
