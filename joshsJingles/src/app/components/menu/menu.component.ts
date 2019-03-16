import { Component, OnInit } from '@angular/core';
import {HeaderComService} from '../../services/header-com.service';
import {UserService } from '../../services/user.service';
import { FirebaseService } from '../../services/firebase.service';
import {GlobalValuesService } from '../../services/global-values.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pdfSrc: string = "";
  pdfZoom: Number = 0.5;
  constructor(private hcom: HeaderComService, private udservice: UserService, private firebase: FirebaseService
    , private gv: GlobalValuesService) { }

  ngOnInit() {
    var self = this;
    self.hcom.setHeaderTab("menu");
    window.onresize = (event)=>{
      self.pdfZoom = window.innerWidth / 1600;
      console.log(self.pdfZoom);
    }
    self.pdfZoom = window.innerWidth / 1600;
      console.log(self.pdfZoom);
  }

}
