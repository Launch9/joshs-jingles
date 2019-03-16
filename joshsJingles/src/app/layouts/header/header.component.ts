import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  brandName: string = "Josh's Jingles";
  constructor(private userS : UserService, private router : Router) { }

  ngOnInit() {
    var self = this;
    self.userS.getCurrentUser().then((user)=>{
      document.getElementById("header-user-main").innerHTML = "Welcome, " + user.providerData[0].displayName;
    })
    window.onresize = (event)=>{
      if(window.innerWidth <= 767){
        document.getElementById('header-tab-home').className = "";
        self.brandName = "Home";
      }
      else{
        document.getElementById('header-tab-home').className = "navbar-brand";
        self.brandName = "Josh's Jingles";
      }
    }
  }

  routeHome(){
    var self = this;
    self.router.navigate(['/']);
  }

}
