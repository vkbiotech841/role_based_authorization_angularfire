import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-super-secret',
  templateUrl: './super-secret.component.html',
  styleUrls: ['./super-secret.component.scss']
})
export class SuperSecretComponent implements OnInit {

  createPost: FormGroup;

  title: FormControl;
  blog: FormControl;
  writer: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.intiateCreatePost();
  }


  intiateCreatePost() {
    this.title = new FormControl("", [Validators.required]);
    this.blog = new FormControl("", [Validators.required]);
    this.writer = new FormControl("", [Validators.required]);

    this.createPost = this.formBuilder.group({
      title: this.title,
      blog: this.blog,
      writer: this.writer
    })

  }


  createBlog() {
    if (this.createPost.valid) {
      const data = this.createPost.value;
      this.blogService.createBlog(data)
        .then(result => {
          this.router.navigate(['/content']);
        }
        )
        .catch(error => {
          console.error("error", error);
        })
      console.log("blog", this.createPost.value);
    }
  };
}
