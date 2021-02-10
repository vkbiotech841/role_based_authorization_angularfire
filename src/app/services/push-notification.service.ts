import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  currentMessage = new BehaviorSubject(null);
  constructor(
    private angularFireMessaging: AngularFireMessaging
  ) {
    angularFireMessaging.usePublicVapidKey('BH_VRNug0itv6QeP_RfvP9Ac-qtW7CLDYL7Tb7hm3fRkOo_HyHoIQq6ygT335F-015MIgADcxGv2QaYBEGD5Tv4');
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        console.log('constructor');
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    );

  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.receiveMessage()
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    console.log(`staretd receiving message from firebase`);
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      }, (error) => {
        console.log(`receiveMessage`, error);
      });
  }
}
