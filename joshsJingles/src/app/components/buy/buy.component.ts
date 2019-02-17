import { Component, OnInit } from '@angular/core';
import {HeaderComService} from '../../services/header-com.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  constructor(private hCom: HeaderComService) { }

  ngOnInit() {
    var self = this;
    self.hCom.setHeaderTab("buy");
  }

}
