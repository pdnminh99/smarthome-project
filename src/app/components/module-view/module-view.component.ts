import { Component, Input, OnInit } from "@angular/core";
import { Module } from "../../models/Module";
import { SettingsService } from "../../services/Settings/settings.service";
import { NavigationService } from "src/app/services/Navigation/navigation.service";

@Component({
  selector: "app-module-view",
  templateUrl: "./module-view.component.html",
  styleUrls: ["./module-view.component.scss"]
})
export class ModuleViewComponent implements OnInit {
  @Input()
  modules: Array<Module>;

  constructor(
    public settings: SettingsService,
    public navigationService: NavigationService
  ) {}

  ngOnInit() {}
}
