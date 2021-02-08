import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-subscriber-page',
  templateUrl: './subscriber-page.component.html',
  styleUrls: ['./subscriber-page.component.scss']
})
export class SubscriberPageComponent implements OnInit {

  postRef: AngularFirestoreDocument<any>;
  post$: Observable<any>;
  user: User;

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService
  ) {

  }

  ngOnInit(): void {
    this.postRef = this.afs.doc('posts/myTestPost');
    this.post$ = this.postRef.valueChanges();
  }


  editPost() {
    this.postRef.update({ title: 'Edited Title!' })
  }


  deletePost() {
    this.postRef.delete()
  }

}
