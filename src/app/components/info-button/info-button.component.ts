import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.scss']
})
export class InfoButtonComponent implements OnInit {
  @Input()
  public isLightON = false;

  ngOnInit() {
  }

  constructor() {
  }

}
