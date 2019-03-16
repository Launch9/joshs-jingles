import { Component, OnInit } from '@angular/core';
import {UserService } from '../../services/user.service';
import {HeaderComService} from '../../services/header-com.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalValuesService } from '../../services/global-values.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  purchaseForm: FormGroup;
  sellForm: FormGroup;
  typeOfLetterSelected = 0;
  constructor(private router: Router, private gvs: GlobalValuesService, private firebase: FirebaseService, private userService: UserService,private fb: FormBuilder,private hCom: HeaderComService) {
    var self = this;
    self.hCom.setHeaderTab('request');
    this.createForm();
  }

  ngOnInit() {
    var self = this;
    self.hCom.setHeaderTab('request');
   
    self.hCom.showLoading();

    this.gvs.isShopOpen((value)=>{
     
      if(!value){
        document.getElementById("shopClosedWarning").style.display = "block";
      }
      else{
        document.getElementById("shopClosedWarning").style.display = "none";
      }
    })
    this.userService.getCurrentUser().then((user)=>{
      self.hCom.hideLoading();
     
      if(user.emailVerified === false){
        document.getElementById("emailWarning").style.display = "block";
      }
      else{
        document.getElementById("emailWarning").style.display = "none";
      }
    })
  }

  createForm() {
    this.purchaseForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
    this.sellForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  setTypeOfLetter(newType){
    this.typeOfLetterSelected = newType;
  }

  goBack(){
    this.typeOfLetterSelected = 0;
  }

  sendCard(data){
    var self = this;
   
    switch(self.typeOfLetterSelected){
      case 0:
        data.type = "nothing?";
        break;
      case 1:
        data.type = "purchase";
        break;
      case 2:
        data.type = "sell";
        break;
      default:
        data.type ="default";
        break;
    }
    self.hCom.showLoading();
    self.userService.getCurrentUser().then((user)=>{
    
      data["uid"] = user.uid;
      data["email2"] = user.email;
      self.firebase.addOrder(data, ()=>{
        console.log("Successfully sent card!");
        self.hCom.hideLoading();
        this.router.navigate(['/']);
      })
    }, err => {
      console.log(err);
      this.router.navigate(['/']);
    })
  }

}
