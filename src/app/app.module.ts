import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { SubscriberPageComponent } from './subscriber-page/subscriber-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefineRoleComponent } from './define-role/define-role.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    DashboardComponent,
    SuperSecretComponent,
    SubscriberPageComponent,
    BlogDetailsComponent,
    DefineRoleComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // firebase initilization
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, NgbModule, // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
