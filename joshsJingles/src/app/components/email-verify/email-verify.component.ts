import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HeaderComService } from '../../services/header-com.service';
@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {

  didSendEmail = false;
  didFailtoSendEmail = false;
  constructor(private userService: UserService,private hCom: HeaderComService) { }

  ngOnInit() {
    var self = this;
    this.userService.sendEmailVerification(()=>{
      self.didSendEmail = true;
      self.didFailtoSendEmail = false;
    }, ()=>{
      this.didFailtoSendEmail = true;
      self.didSendEmail = false;
    });
  }

}
