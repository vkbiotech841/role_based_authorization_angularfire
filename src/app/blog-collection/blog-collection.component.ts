import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-collection',
  templateUrl: './blog-collection.component.html',
  styleUrls: ['./blog-collection.component.scss']
})
export class BlogCollectionComponent implements OnInit {

  user: User;

  constructor(
    public auth: AuthService,
    private blogService: BlogService
  ) {


  }

  ngOnInit(): void {
    this.getUser();
    // this.getAllBlogs();
    this.getAllBlogsSnapshots();
    this.getBlogValueChanges();
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

  getAllBlogsSnapshots() {
    this.blogService.getAllBlogsSnapshots().subscribe(result => {
      this.blogs = result;
      console.log("testing result", result);
    }, error => {
      console.error("error", error)
    })
  };



  deleteBlogById(blogId) {
    console.log("blogs", this.blogs);
    this.blogService.deleteBlogById(blogId)
      .then(result => {
      }
      )
      .catch(error => {
        console.error("error", error);
      })
  };

  updateBlogId(blogId) {
    this.blogService.uploadBlogById(blogId, this.blogs);
  }




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

  // This method returns data as an array. but it constantly monitors any value changes. Hence, never ending obserservale.
  getBlogValueChanges() {
    this.blogService.getBlogByIdValueChanges().subscribe(result => {
      console.log("valueChanges", result);
    }, error => {
      console.error("error", error);
    })
  }

}
