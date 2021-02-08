import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { BlogService } from '../blog.service';

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
    public auth: AuthService,
    private blogService: BlogService
  ) {


  }

  ngOnInit(): void {
    this.getUser();
    this.getAllBlogs();
  }


  getUser() {
    this.auth.user$.subscribe(user => {
      this.user = user;
      console.log("userFrom Subscriber page", this.user);
    });
  };


  editPost() {

  };

  deletePost() {

  };

  readPost() {
    console.log("reading post");
  };

  blogs: any[] = [];
  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe(result => {
      result.forEach(doc => {
        this.blogs.push({ ...doc.data(), id: doc.id })
      })
      console.log("result", this.blogs);
    }, error => {
      console.error("error", error);
    })
  };

}
