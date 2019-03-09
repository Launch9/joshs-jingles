import { Injectable } from '@angular/core';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Injectable({
  providedIn: 'root'
})
export class HeaderComService {

  tabs = ["request", "rules", "login", "home", "orders", "menu"];
  defaultTabColor = null;
  constructor() { }

  public setHeaderTab(type: string){
    var self = this;
    if(self.defaultTabColor === null){
      self.defaultTabColor = document.getElementById("header-tab-" + type).style.color;
    }
    
    if(type==="home"){
      document.getElementById("header-tab-" + type).style.color = "white";
    }else{
      document.getElementById("header-tab-home").style.color = self.defaultTabColor;
    }
    for(var i = 0; i < self.tabs.length; i++){
      if(type === self.tabs[i]){
        document.getElementById("header-tab-" + type).classList.add("active");
      }
      else{
        document.getElementById("header-tab-" + self.tabs[i]).classList.remove("active");
      }
    }
  }

  public hideLoading(){
    document.getElementById("loading-spinner-mother").style.display = "none";
  }

  public showLoading(){
    document.getElementById("loading-spinner-mother").style.display = "block";
  }

  public setHeaderUser(text: string){
    document.getElementById("header-user-main").innerHTML = text;
  }
}
