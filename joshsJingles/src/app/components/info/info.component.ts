import { Component, OnInit } from '@angular/core';
import { HeaderComService } from '../../services/header-com.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private hCom: HeaderComService) { }

  ngOnInit() {
    var self = this;
    self.hCom.setHeaderTab('info');
  }

}
