import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-define-role',
  templateUrl: './define-role.component.html',
  styleUrls: ['./define-role.component.scss']
})
export class DefineRoleComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  userDetails: any;
  getUserDetails() {
    this.authService.user$.subscribe(result => {
      this.userDetails = result;
      console.log("user", this.userDetails);
    }, error => {
      console.error("error", error);
    })
  };

  defineEditorRole() {
    console.log("role", this.userDetails.roles);
    const data = {
      editor: true
    };
    this.userDetails.roles = data;
    this.authService.selectRoleByUserId(this.userDetails);
  };

  defineSubscriberRole() {
    console.log("role", this.userDetails.roles);
    const data = {
      subscriber: true
    };
    this.userDetails.roles = data;
    this.authService.selectRoleByUserId(this.userDetails);
  };





}
