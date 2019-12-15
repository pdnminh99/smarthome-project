import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from '@angular/core';
import { SettingsService } from 'src/services/Settings/settings.service';
import { NavigationService } from 'src/services/Navigation/navigation.service';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from 'src/services/Database/database.service';

@Component({
  selector: 'app-group-edit-form',
  templateUrl: './group-edit-form.component.html',
  styleUrls: ['./group-edit-form.component.scss']
})
export class GroupEditFormComponent implements OnInit {
  private isSendingRequestStatus: boolean;

  public get isSendingRequest(): boolean {
    return this.isSendingRequestStatus;
  }

  public set isSendingRequest(state: boolean) {
    this.isSendingRequestStatus = state;
    this.isHover = state;
  }

  @ViewChild('textbox', { static: false })
  textBox: ElementRef;

  public isHover = false;

  private isActiveState = false;

  public get isActive(): boolean {
    return this.isActiveState;
  }

  public set isActive(state: boolean) {
    this.isActiveState = state;
    if (state) {
      setTimeout(() => this.textBox.nativeElement.focus(), 100);
    }
  }

  public newTitleInput = '';

  private newIcon = '';

  iconsLibrary = [
    'android',
    'apple',
    'windows',
    'ie',
    'chrome',
    'github',
    'aliwangwang',
    'dingding',
    'youtube',
    'medium',
    'qq',
    'taobao',
    'html5',
    'facebook',
    'codepen',
    'code-sandbox',
    'amazon',
    'wechat',
    'slack'
  ];

  public title: string;

  constructor(
    public navigationService: NavigationService,
    public settings: SettingsService,
    private http: HttpClient,
    private database: DatabaseService
  ) {}

  ngOnInit() {}

  public buttonIsClicked(): void {
    this.newTitleInput = this.navigationService.title;
    this.newIcon = this.navigationService.icon;
    this.isActive = true;
  }

  public confirmEditAction(): void {
    if (
      this.newTitleInput === this.title &&
      this.newIcon === this.navigationService.icon
    ) {
      this.isHover = false;
      return;
    }
    this.navigationService.title = this.newTitleInput;
    this.navigationService.icon = this.newIcon;
    this.isSendingRequestStatus = true;
    // tslint:disable-next-line:max-line-length
    this.http
      .get(
        // tslint:disable-next-line: max-line-length
        `https://us-central1-fb-demo-a57e3.cloudfunctions.net/changeGroupName?UUID=${this.database.UUID}&order=${this.navigationService.order}&name=${this.newTitleInput}&icon=${this.newIcon}`
      )
      .subscribe(_ => {
        this.isHover = false;
        this.isSendingRequest = false;
      });
  }
}
