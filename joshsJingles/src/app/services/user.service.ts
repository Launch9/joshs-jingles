import { Injectable } from "@angular/core";
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from './user.model';
@Injectable()
export class UserService {

  //user: FirebaseUserModel = new FirebaseUserModel();
  user = null;
  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth
  ){}

  sendEmailVerification(){
    var self = this;
    self.getCurrentUser().then((user)=>{
      if(user){
        user.sendEmailVerification().then(function() {
          // Email sent.
            console.log("Email has been sent to " + user.email);
         }).catch(function(error) {
          console.log(error);
          // An error happened.
         });
      }
    });
  }

  getCurrentUser(){
    var self = this;
    return new Promise<any>((resolve, reject) => {
      if(self.user === null){
        var user = firebase.auth().onAuthStateChanged(function(user){
          if (user) {
            console.log("Setting user...");
            self.user = user;
            resolve(user);
          } else {
            reject('No user logged in');
          }
        })
      }
      else{
        resolve(user);
      }
    })
  }

  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }
}
