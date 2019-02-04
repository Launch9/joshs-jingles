import { Component, OnInit } from '@angular/core';
import { GlobalValuesService } from '../../services/global-values.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private gv: GlobalValuesService) { }

  updateShopStatus(){
    var self = this;
    console.log("Calling is shop open!");
    console.log(self.gv);
    
    self.gv.isShopOpen((value)=>{
      console.log("Shop value is: ");
      console.log(value.json());
      var imageOpen = document.getElementById('imageOpen');
      var imageClose = document.getElementById('imageClose');
      if(value.json() === false){
        //Shop is closed.
        console.log("Closing shop.");
        imageOpen.style.display = "none";
        imageClose.style.display = "block";
      }else{
        //Shop is open.
        console.log("Opening shop.");
        imageOpen.style.display = "block";
        imageClose.style.display = "none";
      }
    });
  }

  ngOnInit() {
    var self = this;
    
      console.log("Updating shop status!");
    self.updateShopStatus();
 
    
  }

}
