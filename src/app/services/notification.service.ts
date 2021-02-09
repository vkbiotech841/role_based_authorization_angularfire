import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }


  //////// Broad-cast services :Starts here ////////////
  createBroadCastMessage() {

  }

  getAllBroadCastMessages() {

  }

  //////// Broad-cast services :Ends here ////////////


  //////// Notification services :Starts here ////////////


  createNotificationMessage() {

  }

  getAllNotificationMessages() {

  }

  deleteNotificationMessage() {

  }

  //////// Notification services :Ends here ////////////
}
