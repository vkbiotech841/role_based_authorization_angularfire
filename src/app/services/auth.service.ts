import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null | undefined>;
  user: any;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {

    this.getUserStateAndFetchUserDocumentFromFireStore();
  }

  getUserStateAndFetchUserDocumentFromFireStore() {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          this.user = user;
          localStorage.setItem('owner_id', this.user.uid);
          localStorage.setItem('owner_email', this.user.email);
          localStorage.setItem('owner_details', JSON.stringify(this.user));
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          localStorage.setItem('owner_id', null);
          localStorage.setItem('owner_email', null);
          localStorage.setItem('owner_details', null);
          // Logged out
          return of(null);
        }
      })
    )
  };


  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['/dashboard']);
    this.activeUserStatus(credential.user);
    return this.updateUserData(credential.user);
  };

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        subscriber: true
      }
    }
    return userRef.set(data, { merge: true })
  };

  async signOut() {
    const owner_id = localStorage.getItem("owner_id")
    this.inactiveUserStatus(owner_id);
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  };


  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed: any = ['admin', 'editor', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed: any = ['admin', 'editor']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed: any = ['admin']
    return this.checkAuthorization(user, allowed)
  }


  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: []): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true
      }
    }
    return false
  }


  userId: string;

  getUserIdFromLocalStorage() {
    this.userId = localStorage.getItem('owner_id');
  };

  selectRoleByUserId(updatedData) {
    this.getUserIdFromLocalStorage();
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .update(updatedData)
  }

  //////////// Active and inactive status /////////////////////

  activeUserStatus(user: any) {
    const data = {
      status: "active",
    }
    return this.firestore
      .doc(`users/${user.uid}`)
      .update(data)
  }

  inactiveUserStatus(userId: any) {
    const data = {
      status: "inactive",
    }
    return this.firestore
      .doc(`users/${userId}`)
      .update(data)
  }


}
