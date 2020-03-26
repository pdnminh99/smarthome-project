import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../services/Database/database.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';

@Component({
  selector: 'app-sidenav-submenu',
  templateUrl: './sidenav-submenu.component.html',
  styleUrls: ['./sidenav-submenu.component.scss']
})
export class SidenavSubmenuComponent implements OnInit {
  @Input()
  theme: string;

  @Input()
  isCollapsed: boolean;

  constructor(
    public db: DatabaseService,
    public navigation: NavigationService
  ) {}

  ngOnInit() {}
}
