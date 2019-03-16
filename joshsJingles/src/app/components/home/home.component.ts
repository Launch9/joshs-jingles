import { Component, OnInit } from '@angular/core';
import { GlobalValuesService } from '../../services/global-values.service';
import {HeaderComService} from '../../services/header-com.service';
import {UserService } from '../../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userData: UserService, private gv: GlobalValuesService, private hCom: HeaderComService) { }

  updateShopStatus(){
    var self = this;
    
  
    self.hCom.setHeaderTab('home');
    self.hCom.showLoading();
    self.gv.isShopOpen((value)=>{
    
      var imageOpen = document.getElementById('imageOpen');
      var imageClose = document.getElementById('imageClose');
      if(value === false){
        //Shop is closed.
       
        imageOpen.style.display = "none";
        imageClose.style.display = "block";
      }else{
        //Shop is open.
       
        imageOpen.style.display = "block";
        imageClose.style.display = "none";
      }
      self.hCom.hideLoading();
    });
  }

  ngOnInit() {
    var self = this;
    
    self.updateShopStatus();
 
    
  }

}
