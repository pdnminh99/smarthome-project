import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/Database/database.service';
import { SettingsService } from '../../../services/Settings/settings.service';
import { AuthenticatorService } from 'src/services/Authenticator/authenticator.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public databaseService: DatabaseService, public settings: SettingsService, public auth: AuthenticatorService) {
  }

  ngOnInit() {
  }

}
