import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingsService } from '../../../services/Settings/settings.service';
import { ViewportService } from '../../../services/Viewports/viewport.service';
import { NavigationService } from 'src/services/Navigation/navigation.service';

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

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onSearchEnter = new EventEmitter();

  public searchInput = '';

  constructor(
    public settings: SettingsService,
    public viewService: ViewportService
  ) {}

  ngOnInit() {}

  connectButtonTrigger() {
    this.isConnectButtonClicked.emit(null);
  }

  runSearch(): void {
    this.onSearchEnter.emit(this.searchInput);
  }
}
