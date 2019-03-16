import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HeaderComService} from '../../services/header-com.service';

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private hCom: HeaderComService
  ) {
    var self = this;
    self.hCom.setHeaderTab('login');
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryLogin(value){
    var self = this;
    self.hCom.showLoading();
    this.authService.doLogin(value)
    .then(res => {
      self.hCom.hideLoading();
      this.router.navigate(['/user']);
    }, err => {
      console.log(err);
      self.hCom.hideLoading();
      this.errorMessage = err.message;
    })
  }
}
