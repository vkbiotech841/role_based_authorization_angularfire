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
    this.getAllLoggedInUsers();
  }

  listOfLoggedInUsers: any[] = [];
  uid: string;
  getAllLoggedInUsers() {
    this.userService.getAllLoggedInUsers().subscribe(result => {
      result.forEach(doc => {
        this.listOfLoggedInUsers.push(doc.data());
      })
      this.uid = localStorage.getItem("owner_id");
      console.log("doc", this.listOfLoggedInUsers);

    }, error => {
      console.log("error", error);
    })
  }

}
