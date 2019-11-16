import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav-header',
  templateUrl: './sidenav-header.component.html',
  styleUrls: ['./sidenav-header.component.scss']
})
export class SidenavHeaderComponent implements OnInit {

  @Input()
  isCollapsed: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
