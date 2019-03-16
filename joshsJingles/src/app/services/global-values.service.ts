import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GlobalValuesService {

  constructor(private http: HttpClient) { }

  isShopOpen(callback:(value)=>void){
   
    var self = this;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    self.http.get(environment.serverURL + 'isShopOpen', {
      observe: 'response'}).subscribe((value=>{
        callback(value.body);
    }));
  }

}
