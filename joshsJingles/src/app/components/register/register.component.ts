import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HeaderComService} from '../../services/header-com.service';
import {FirebaseService} from '../../services/firebase.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  canRegister: boolean = true;
  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private hCom: HeaderComService,
    private fireB: FirebaseService,
    private uData: UserService
  ) {
    var self = this;
    self.hCom.setHeaderTab('register');
    this.createForm();
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['',Validators.required],
       displayName: ['',Validators.required]
     });
   }

   tryRegister(value){
      var self = this;
      console.log("Value");
      console.log(value);
      if(self.canRegister){
        self.fireB.makeRoomForNewAccount(value.email, (res)=>{

            console.log("Value deal");
            console.log(value);
            this.authService.doRegisterWithName(value)
            .then(res => {
              console.log(res);
              this.errorMessage = "";
              this.successMessage = "Your account has been created. We sent you an email to verify your account.";
              self.canRegister = false;
              self.uData.sendEmailVerification();
              /*self.fireB.fillUserInfo({
                "uid": res.user.uid,
                "userData":{
                  "firstName": firstName,
                  "lastName": lastName
                }
                
              }, (value)=>{
                 this.successMessage = "Your account has been created. Please verify your email to use the service.";
                 console.log("Finished filling user information.");
                 
              })*/
            
            }, err => {
              console.log(err);
              this.errorMessage = err.message;
              this.successMessage = "";
            })
          
        });
      }
      else{
        console.log("You can't register again!");
      }
     
   }

}
