import { MessagingService } from './services/messaging.service';
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
    private messagingService: MessagingService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.messagingService.requestPermission()
      // this.messagingService.receiveMessage();
      this.message = this.messagingService.currentMessage;
    }, 5000);
  }
}
