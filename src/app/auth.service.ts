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

  user$: Observable<User | null | undefined>;
  // user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
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
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
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
    return this.updateUserData(credential.user);
  };

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

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
    if (!user) return false
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true
      }
    }
    return false
  }
}
