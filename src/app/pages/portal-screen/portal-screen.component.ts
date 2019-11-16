import {Component, OnInit} from '@angular/core';
import {NavigationItem} from '../../../models/NavigationItem';
import {SettingsService} from '../../../services/Settings/settings.service';
import {DatabaseService} from '../../../services/Database/database.service';
import {NavigationGroup} from '../../../models/NavigationGroup';

@Component({
  selector: 'app-portal-screen',
  templateUrl: './portal-screen.component.html',
  styleUrls: ['./portal-screen.component.scss']
})
export class PortalScreenComponent implements OnInit {

  isCollapsed = false;

  constructor(public settings: SettingsService, public database: DatabaseService) {
  }

  ngOnInit() {
  }

}
