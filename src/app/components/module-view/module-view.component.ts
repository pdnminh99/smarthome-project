import { Component, Input, OnInit } from '@angular/core';
import { Module } from '../../../models/Module';
@Component({
  selector: 'app-module-view',
  templateUrl: './module-view.component.html',
  styleUrls: ['./module-view.component.scss']
})
export class ModuleViewComponent implements OnInit {

  @Input()
  modules: Array<Module>;

  constructor() {
  }

  ngOnInit() {
  }
}
