import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllLoggedInUsersValuChanges();
  }

  listOfLoggedInUsers: any[] = [];


  getAllLoggedInUsersValuChanges() {
    this.userService.getAllLoggedInUsersValueChanges().subscribe(result => {
      this.listOfLoggedInUsers = result;
      console.log("result", result)
    }, error => {
      console.error("error", error);
    })
  }

}
