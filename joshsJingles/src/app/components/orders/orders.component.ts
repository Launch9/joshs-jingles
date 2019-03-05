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
    self.us.getCurrentUser().then((user)=>{
      self.fbs.requestOrders(user.uid, (value)=>{
        console.log("Request order value");
        console.log(value);
        self.orders = value.body.value;
        console.log(self.orders);
      })
    }).catch((error)=>{
      console.log("Error occured whilst requesting orders. " + error);
    })
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
    self.us.getCurrentUser().then((user)=>{
      self.fbs.removeOrder(user.uid,self.currentOrderUID,()=>{
        console.log("Succesfully removed order!");
        
      })
    })
  }

}
