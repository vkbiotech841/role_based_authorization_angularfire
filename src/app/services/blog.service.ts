import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, DocumentChangeType, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


interface DocumentChangeAction {
  //'added' | 'modified' | 'removed';
  type: DocumentChangeType;
  payload: DocumentChange;
}

interface DocumentChange {
  type: DocumentChangeType;
  doc: DocumentSnapshot;
  oldIndex: number;
  newIndex: number;
}

interface DocumentSnapshot {
  exists: boolean;
  ref: DocumentReference;
  id: string;
  // metadata: SnapshotMetadata;
  data(): DocumentData;
  get(fieldPath: string): any;
}

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

  // Get data fetch data only once. but snapshotchanges monitors value changes and fetch data after any changes.
  // Means get data is a one time observable but snapshotchanges is never ending observable.
  getAllBlogs() {
    this.getUserIdFromLocalStorage();
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("blogs")
      .get()
  };

  // This method returns data as an array.
  getAllBlogsSnapshots(): Observable<any> {
    this.getUserIdFromLocalStorage();
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("blogs")
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        }))
      )
  }

  // This method returns data as an array. but it constantly monitors any value changes. Hence, never ending obserservale.
  getBlogByIdValueChanges(): Observable<any> {
    this.getUserIdFromLocalStorage();
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("blogs")
      .valueChanges()
  }

  // This method returns data as an object.
  getBlogById(blogId: string) {
    this.getUserIdFromLocalStorage();
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("blogs")
      .doc(blogId)
      .get()
  }



  deleteBlogById(blogId: string) {
    this.getUserIdFromLocalStorage();
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("blogs")
      .doc(blogId)
      .delete()
  };

  uploadBlogById(blogId, updatedData) {
    this.getUserIdFromLocalStorage();
    return this.firestore
      .collection("users")
      .doc(this.userId)
      .collection("blogs")
      .doc(blogId)
      .update(updatedData)
  };

}
