import { Component, OnInit } from '@angular/core';
import {HeaderComService} from '../../services/header-com.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private hCom: HeaderComService) { }

  ngOnInit() {
    var self = this;
    self.hCom.setHeaderTab('orders');
  }

}
