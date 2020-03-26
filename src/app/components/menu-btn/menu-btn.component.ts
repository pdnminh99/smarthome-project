import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/Settings/settings.service';

@Component({
  selector: 'app-menu-btn',
  templateUrl: './menu-btn.component.html',
  styleUrls: ['./menu-btn.component.scss']
})
export class MenuBtnComponent implements OnInit {

  constructor(public settings: SettingsService) {
  }

  ngOnInit() {
  }

}
