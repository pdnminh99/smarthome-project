import {Component, OnInit, Input} from '@angular/core';
import {NavigationItem} from '../../../models/NavigationItem';

@Component({
  selector: 'app-sidenav-submenu',
  templateUrl: './sidenav-submenu.component.html',
  styleUrls: ['./sidenav-submenu.component.scss']
})
export class SidenavSubmenuComponent implements OnInit {

  @Input()
  isCollapsed: boolean;

  @Input()
  public items: Array<NavigationItem>;

  @Input()
  public title: string;

  @Input()
  public icon: string;

  constructor() {
  }

  ngOnInit() {
  }

}
