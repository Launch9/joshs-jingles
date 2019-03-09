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
  errorMessage: string = 'dflkgnslkdjfbnfdkljbn';
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
            this.authService.doRegisterWithName(value, (error)=>{
              console.log("Nope! I have an error!");
              console.log(error);
              this.errorMessage = error.message;
              this.successMessage = "";
              
            })
            .then(res => {
              console.log("Got here!");
              console.log(res);
              /*self.fireB.fillUserInfo({"data":{"email":value.email}, "uid":res.user.uid}, (value)=>{
                console.log("Successfully filled user info.");
              },(error)=>{
                console.error(error);
              })*/
              this.errorMessage = "";
              this.successMessage = "Your account has been created. We sent you an email to verify your account.";
              self.canRegister = false;
              self.uData.sendEmailVerification();
            });
          
        });
      }
      else{
        console.log("You can't register again!");
      }
     
   }

}
