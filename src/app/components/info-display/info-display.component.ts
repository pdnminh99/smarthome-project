import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-display',
  template: `
      <div style="width: 100%">
          <div style="text-align: center; font-weight: lighter; font-size: 20px;">{{ title }}</div>
          <div style="text-align: center; font-weight: normal; font-size: 20px;">{{ data }}</div>
      </div>
  `,
})
export class InfoDisplayComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  data: any;

  constructor() {
  }

  ngOnInit() {
  }

}



