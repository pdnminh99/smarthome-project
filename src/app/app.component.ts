import {Component, ViewChild} from '@angular/core';
import {SettingsService} from '../services/Settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public settings: SettingsService) {
    console.log(settings);
  }
}
