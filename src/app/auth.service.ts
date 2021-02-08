import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user.model';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user$: Observable<User>;
  user$: Observable<any>;
  firebaseUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )

    // this.setUserDetailsToLocalStorage();


  }


  // Getting owner details from firebase
  setUserDetailsToLocalStorage() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firebaseUser = user;
        localStorage.setItem('owner_details', JSON.stringify(this.firebaseUser));
        localStorage.setItem('owner_id', this.firebaseUser.uid);
        localStorage.setItem('owner_email', this.firebaseUser.email);
      } else {
        localStorage.setItem('owner_details', 'null');
        localStorage.setItem('owner_id', 'null');
        localStorage.setItem('owner_email', 'null');
      }
    });
  };



  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  };

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data, { merge: true })
  };

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  };
}
