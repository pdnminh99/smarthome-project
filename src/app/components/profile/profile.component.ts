import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../../../services/Database/database.service';
import {SettingsService} from '../../../services/Settings/settings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private databaseService: DatabaseService, private settings: SettingsService) {
  }

  ngOnInit() {
  }

}
