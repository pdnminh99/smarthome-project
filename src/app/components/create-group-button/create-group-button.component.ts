import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-group-button',
  templateUrl: './create-group-button.component.html',
  styleUrls: ['./create-group-button.component.scss']
})
export class CreateGroupButtonComponent implements OnInit {

  @Input()
  isCollapsed: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
