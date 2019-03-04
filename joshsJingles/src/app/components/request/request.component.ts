import { Component, OnInit } from '@angular/core';
import {UserService } from '../../services/user.service';
import {HeaderComService} from '../../services/header-com.service';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  purchaseForm: FormGroup;
  sellForm: FormGroup;
  typeOfLetterSelected = 0;
  constructor(private router: Router, private firebase: FirebaseService, private userService: UserService,private fb: FormBuilder,private hCom: HeaderComService) {
    var self = this;
    self.hCom.setHeaderTab('request');
    this.createForm();
  }

  ngOnInit() {
    var self = this;
    self.hCom.setHeaderTab('request');
    console.log("Setting header!");
    this.userService.getCurrentUser().then((user)=>{
      console.log("Logging user!");
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
    console.log("Logging formData!");
    console.log(data);
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
    self.userService.getCurrentUser().then((user)=>{
      console.log(user);
      data["uid"] = user.uid;
      self.firebase.addRequest(data, ()=>{
        console.log("Successfully sent card!");
        this.router.navigate(['/']);
      })
    }, err => {
      console.log(err);
      this.router.navigate(['/']);
    })
  }

}
