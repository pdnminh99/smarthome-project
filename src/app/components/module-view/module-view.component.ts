import {Component, Input, OnInit} from '@angular/core';
import {Module} from '../../../models/Module';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../../../services/Database/database.service';
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

  constructor(private settings: SettingsService) {
  }

  ngOnInit() {
  }
}
