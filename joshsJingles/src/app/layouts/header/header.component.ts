import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userS : UserService, private router : Router) { }

  ngOnInit() {
    var self = this;
    self.userS.getCurrentUser().then((user)=>{
      console.log("User: ");
      console.log(user);
      console.log(user.providerData);
      document.getElementById("header-user-main").innerHTML = "Welcome, " + user.providerData[0].displayName;
    })
  }

  routeHome(){
    var self = this;
    self.router.navigate(['/']);
  }

}
