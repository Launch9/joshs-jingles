import { Component, OnInit } from '@angular/core';
import {HeaderComService} from '../../services/header-com.service';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  constructor(private hCom: HeaderComService) { }

  ngOnInit() {
    var self = this;
    self.hCom.setHeaderTab('sell');
  }

}
