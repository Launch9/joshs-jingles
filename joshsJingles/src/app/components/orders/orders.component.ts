import { Component, OnInit } from '@angular/core';
import {HeaderComService} from '../../services/header-com.service';
import { FirebaseService } from '../../services/firebase.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:[];
  currentOrderUID:"";
  constructor(private hCom: HeaderComService, private fbs: FirebaseService, private us: UserService) { }

  ngOnInit() {
    var self = this;
    self.hCom.setHeaderTab('orders');
    self.hCom.showLoading();
    self.us.getCurrentUser().then((user)=>{
      self.fbs.requestOrders(user.uid, (value)=>{
        
        console.log("Request order value");
        console.log(value);
        self.hCom.hideLoading();
        self.orders = value.body.value;
        if(self.orders.length === 0){
          document.getElementById("noMessage").style.display = "block";
        }
        console.log(self.orders);
      })
    }).catch((error)=>{
      self.hCom.hideLoading();
      console.log("Error occured whilst requesting orders. " + error);
    })
  }

  makeFormID(prefix, orderUID){
    return prefix + orderUID;
  }

  openDeleteDialog(orderUID){
    var self = this;
    console.log("OrderUID: " + orderUID);
    self.currentOrderUID = orderUID;
    document.getElementById("deleteDialog").style.display = "block";
  }
  
  closeDeleteDialog(){
    document.getElementById("deleteDialog").style.display = "none";
  }

  actuallyDelete(){
    var self = this;
    var orderID = self.currentOrderUID;
    self.hCom.showLoading();
    self.us.getCurrentUser().then((user)=>{
      self.fbs.removeOrder(user.uid,orderID,()=>{
        console.log("Succesfully removed order!");
        for(var i = 0; i < self.orders.length; i++){
          if(this.orders[i]['orderUUID'] == orderID){
            console.log("Found order to delete!");
            this.orders.splice(i, 1);
          }
        }
        this.closeDeleteDialog();
        self.hCom.hideLoading();
      })
    })
  }

  setButtonNonUpdated(doc){
    doc.style.backgroundColor = "white";
    doc.innerHTML = "Update Order";
  }

  setButtonUpdated(doc){
    var self = this;
    doc.style.backgroundColor = "pink";
    doc.innerHTML = "Updated!";
    setTimeout(()=>{
      self.setButtonNonUpdated(doc);
    }, 2000);
  }

  updateOrder(orderUID, orderType){
    var self = this;
    console.log(orderUID);
    var itemDoc = <HTMLInputElement>document.getElementById("form-item-" + orderUID);
    var commentDoc = <HTMLInputElement>document.getElementById("form-comment-" + orderUID);
    var buttonDoc = document.getElementById('form-button-' + orderUID);
    self.hCom.showLoading();
    self.us.getCurrentUser().then((user)=>{
      var fd = {"email": itemDoc.value, "password":commentDoc.value, "type": orderType, "email2": user.email};
      self.fbs.updateOrder(fd,orderUID,(value)=>{
        self.hCom.hideLoading();
        self.setButtonUpdated(buttonDoc);
      });
    })
  }

}
