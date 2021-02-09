import { BlogService } from './../blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getBlogId();
  }

  blogId: string;
  getBlogId() {
    this.activatedRoute.params.subscribe(params => {
      this.blogId = params.blogId;
    });
    this.loadBlog();

  };


  blogDetails: any;

  // This method returns data as an object.
  loadBlog() {
    this.blogService.getBlogById(this.blogId)
      .subscribe(result => {
        this.blogDetails = result.data();
        console.log("blogDetails", this.blogDetails);
      }
      ), error => {
        console.error("error", error);
      }
  };




}
