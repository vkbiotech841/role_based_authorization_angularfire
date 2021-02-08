import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
  ) {
    // this.getUserIdFromLocalStorage();
  }

  userId: string;

  getUserIdFromLocalStorage() {
    this.userId = localStorage.getItem('owner_id');
  };


  createBlog(blogData) {
    this.getUserIdFromLocalStorage();
    const data = blogData;
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("blogs")
      .doc()
      .set(data);
  };


  getAllBlogs() {
    this.getUserIdFromLocalStorage();
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("blogs")
      .get()
  }
}
