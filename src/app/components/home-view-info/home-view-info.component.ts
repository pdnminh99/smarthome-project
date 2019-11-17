import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-home-view-info',
  templateUrl: './home-view-info.component.html',
  styleUrls: ['./home-view-info.component.scss']
})
export class HomeViewInfoComponent implements OnInit {

  @Input()
  isVisible: boolean;

  @Output()
  isConnectButtonClicked = new EventEmitter();

  @Input()
  title: string;

  @Input()
  email: string;

  constructor() {
  }

  ngOnInit() {
  }

  connectButtonTrigger() {
    this.isConnectButtonClicked.emit(null);
  }

}
