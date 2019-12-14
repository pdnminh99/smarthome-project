import {Component, Input, OnInit} from '@angular/core';
import {Module} from '../../../models/Module';
import {SettingsService} from '../../../services/Settings/settings.service';

@Component({
  selector: 'app-module-view',
  templateUrl: './module-view.component.html',
  styleUrls: ['./module-view.component.scss']
})
export class ModuleViewComponent implements OnInit {

  @Input()
  order: number;

  @Input()
  groupID: string;

  @Input()
  modules: Array<Module>;

  constructor(public settings: SettingsService) {
  }

  ngOnInit() {
  }
}
