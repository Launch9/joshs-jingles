import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GlobalValuesService {

  constructor(private http: Http) { }

  isShopOpen(callback:(value)=>void){
    var self = this;
    self.http.get(environment.serverURL + 'isShopOpen').subscribe((value=>{
      callback(value);
    }));
  }
}
