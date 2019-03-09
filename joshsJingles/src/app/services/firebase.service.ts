import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { HeaderComService } from './header-com.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient, private hcom: HeaderComService) { 
    
  }

  /**
   * Fills the user's data folder with whatever you want. 
   * Overwrites already existing data.
   * @param userUID What identifies the user from another.
   * @param userData The data that is being stored.
   * @param callback Gets called when the http request is complete.
   */
  public fillUserInfo(userData, callback:(value)=>void, onError:(error)=>void=null, hideLoadingOnFail=true){
    var self = this;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    self.http.post(environment.serverURL + 'fillUserData', JSON.stringify(userData), {headers: headers}).subscribe((value=>{
      callback(value);
    }), (err)=>{
      if(hideLoadingOnFail){
        self.hcom.hideLoading();
      }
      if(onError !== null){
        onError(err);
      }else{
        console.error(err);
      }
    });
  }
  
  public makeRoomForNewAccount(email, callback:(value)=>void, onError:(error)=>void=null, hideLoadingOnFail=true){
    var self = this;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    self.http.post(environment.serverURL + 'makeRoomForNewAccount', JSON.stringify({"email":email}), {headers: headers}).subscribe((value=>{
      callback(value);
    }), (err)=>{
      if(hideLoadingOnFail){
        self.hcom.hideLoading();
      }
      if(onError !== null){
        onError(err);
      }else{
        console.error(err);
      }
    });
  }

  public addOrder(formData, callback:(value)=>void, onError:(error)=>void=null, hideLoadingOnFail=true){
    var self = this;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    var json = JSON.stringify({"data":{"item": formData.email,
    "comment": formData.password,
    "type": formData.type}, "uid": formData.uid});
    self.http.post(environment.serverURL + 'addOrder', json, {headers: headers}).subscribe((value=>{
      callback(value);
    }), (err)=>{
      if(hideLoadingOnFail){
        self.hcom.hideLoading();
      }
      if(onError !== null){
        onError(err);
      }else{
        console.error(err);
      }
    });
  }

  public updateOrder(formData, callback:(value)=>void, onError:(error)=>void=null, hideLoadingOnFail=true){
    
  }

  public requestOrders(userUID, callback:(value)=>void, onError:(error)=>void=null, hideLoadingOnFail=true){
    console.log("Requesting orders");
    var self = this;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    self.http.get(environment.serverURL + 'requestOrders', {
      params: {
        userUID: userUID
      },
      observe: 'response'}).subscribe((value=>{
        console.log("This is the response1");
        console.log(value);
        callback(value);
    }), (err)=>{
      if(hideLoadingOnFail){
        self.hcom.hideLoading();
      }
      if(onError !== null){
        onError(err);
      }else{
        console.error(err);
      }
    });
  }

  public removeOrder(userUID, orderUID, callback:(value)=>void, onError:(error)=>void=null, hideLoadingOnFail=true){
    console.log("Removing order!");
    var self = this;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        uid: userUID,
        orderUID: orderUID
      },
    };
    self.http.delete(environment.serverURL + 'removeOrder', options).subscribe((value=>{
      callback(value);
    }), (err)=>{
      if(hideLoadingOnFail){
        self.hcom.hideLoading();
      }
      if(onError !== null){
        onError(err);
      }else{
        console.error(err);
      }
    });
  }

}
