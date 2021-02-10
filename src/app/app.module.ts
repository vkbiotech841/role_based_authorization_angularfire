import { PushNotificationService } from './services/push-notification.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';


import { environment } from 'src/environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefineRoleComponent } from './define-role/define-role.component';
import { LoginComponent } from './login/login.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { BlogCollectionComponent } from './blog-collection/blog-collection.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AsyncPipe } from '@angular/common';
import { MessagingService } from './services/messaging.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BlogDetailsComponent,
    DefineRoleComponent,
    LoginComponent,
    CreateBlogComponent,
    BlogCollectionComponent,
    AdminDashboardComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebaseConfig), // firebase initilization
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireMessagingModule, // cloud messaging


  ],
  providers: [PushNotificationService, MessagingService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
