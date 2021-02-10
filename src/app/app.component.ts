import { PushNotificationService } from './services/push-notification.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'role-based-authorization-angularfire';

  message;
  constructor(
    private pushNotificationService: PushNotificationService
  ) { }

  ngOnInit() {
    this.pushNotificationService.requestPermission()
    this.pushNotificationService.receiveMessage();
    this.message = this.pushNotificationService.currentMessage;
  }
}
