import { Component, OnInit } from '@angular/core';
import {HeaderComService} from '../../services/header-com.service';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  constructor(private hCom: HeaderComService) { }

  ngOnInit() {
    var self = this;
    self.hCom.setHeaderTab('rules');
  }

}
