import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefineRoleComponent } from './define-role/define-role.component';
import { LoginComponent } from './login/login.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { BlogCollectionComponent } from './blog-collection/blog-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BlogDetailsComponent,
    DefineRoleComponent,
    LoginComponent,
    CreateBlogComponent,
    BlogCollectionComponent
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
