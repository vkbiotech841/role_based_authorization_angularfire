import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, DocumentChangeType, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }



  userId: string;

  getUserIdFromLocalStorage() {
    this.userId = localStorage.getItem('owner_id');
  };


  getAllLoggedInUsers() {
    return this.firestore
      .collection("users")
      .get();
  }

  getAllLoggedInUsersValueChanges(): Observable<any> {
    return this.firestore
      .collection("users")
      .valueChanges()
  }


}
