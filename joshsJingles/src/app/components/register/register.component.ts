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
    
    this.createForm();
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['',Validators.required],
       displayName: ['',Validators.required],
       phoneNumber: ['']
     });
   }

   tryRegister(value){
      
      var self = this;
      self.hCom.showLoading();
     
        if(value.email.slice(-9) === "@uncc.edu"){
          self.fireB.makeRoomForNewAccount(value.email, (res)=>{

           
            this.authService.doRegisterWithName(value, (error)=>{
             
              console.log(error);
              this.errorMessage = error.message;
              this.successMessage = "";
              self.hCom.hideLoading();
            })
            .then(res => {
             
              this.errorMessage = "";
              this.successMessage = "Your account has been created. We sent you an email to verify your account.";
              self.canRegister = false;
              self.uData.sendEmailVerification();
              self.hCom.hideLoading();
            });
          
          });
        }
        else{
          this.errorMessage = "Please input your school email.";
          this.successMessage = "";
          self.hCom.hideLoading();
        }
      
   }

}
