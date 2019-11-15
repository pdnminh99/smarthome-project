import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-module-view",
  templateUrl: "./module-view.component.html",
  styleUrls: ["./module-view.component.scss"]
})
export class ModuleViewComponent implements OnInit {
  panels = [
    {
      active: true,
      disabled: false,
      name: "Living room",
      childPannel: [
        {
          active: false,
          disabled: true,
          name: "This is panel header 1-1"
        }
      ]
    },
    {
      active: false,
      disabled: true,
      name: "This is panel header 2"
    },
    {
      active: false,
      disabled: false,
      name: "This is panel header 3"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
