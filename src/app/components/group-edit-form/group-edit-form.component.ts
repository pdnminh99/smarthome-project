import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from "@angular/core";
import { SettingsService } from "src/app/services/Settings/settings.service";
import { NavigationService } from "src/app/services/Navigation/navigation.service";
import { HttpClient } from "@angular/common/http";
import { DatabaseService } from "src/app/services/Database/database.service";
@Component({
  selector: "app-group-edit-form",
  template: `
    <div
      style="width: 100%; margin-bottom: 10px; text-align: center; height: 50px;"
    >
      <button
        *ngIf="!isActive"
        style="font-size: 26px; font-weight: bold; text-align: center; height: 100%; background-color: transparent;"
        [ngStyle]="{ color: settings.isDark ? '#fff' : '#000' }"
        nz-button
        (mouseover)="isHover = true"
        (mouseleave)="isHover = false"
        [nzType]="isHover ? 'default' : 'link'"
        nzShape="round"
        [nzLoading]="isSendingRequest"
        (click)="buttonIsClicked()"
      >
        <i nz-icon [nzType]="navigationService.icon"></i>
        {{ navigationService.title }}
      </button>
      <nz-input-group
        *ngIf="isActive"
        style="text-align: center; height: 100%;"
      >
        <input
          #textbox
          (focusout)="isActive = false; confirmEditAction()"
          style="font-size: 26px; font-weight: bold; text-align: center; height: 100%; border-radius: 4px; background-color: transparent;"
          (keyup.enter)="isActive = false; confirmEditAction()"
          nz-input
          [(ngModel)]="newTitleInput"
          placeholder="New group title goes here ..."
        />
      </nz-input-group>
    </div>
  `,
  styles: [
    `
      .group-box {
        margin: 5px auto;
        text-align: center;
        height: 50px;
        line-height: 50px;
        width: 200px;
        border-radius: 4px;
      }
    `
  ]
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

  @ViewChild("textbox")
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

  public newTitleInput = "";

  private newIcon = "";

  iconsLibrary = [
    "android",
    "apple",
    "windows",
    "ie",
    "chrome",
    "github",
    "aliwangwang",
    "dingding",
    "youtube",
    "medium",
    "qq",
    "taobao",
    "html5",
    "facebook",
    "codepen",
    "code-sandbox",
    "amazon",
    "wechat",
    "slack"
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
