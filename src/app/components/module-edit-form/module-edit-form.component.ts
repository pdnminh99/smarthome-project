import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { SettingsService } from "../../services/Settings/settings.service";
import { HttpClient } from "@angular/common/http";
import { Module } from "../../models/Module";

@Component({
  selector: "app-module-edit-form",
  template: `
    <div
      style="width: 100%; margin-bottom: 10px; text-align: center; height: 50px;"
    >
      <button
        *ngIf="!isActive"
        style="font-size: 26px; font-weight: bold; text-align: center; height: 100%; background-color: transparent"
        [ngStyle]="{ color: settings.isDark ? '#fff' : '#000' }"
        nz-button
        (mouseover)="isHover = true"
        (mouseleave)="isHover = false"
        [nzType]="isHover ? 'default' : 'link'"
        nzShape="round"
        [nzLoading]="isSendingRequest"
        (click)="buttonIsClicked()"
      >
        {{ module.name }}
      </button>
      <nz-input-group
        *ngIf="isActive"
        style="text-align: center; height: 100%;"
      >
        <input
          #textbox
          class="text-box"
          (focusout)="isActive = false; confirmEditAction()"
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
      .button-focus {
        background-color: transparent;
        border: solid 1px #1890ff;
      }

      .button-outfocus {
        background-color: transparent;
        border: 0 transparent solid;
      }

      .text-box-dark {
        color: #fff;
      }

      .text-box-light {
        color: #000;
      }

      .text-box {
        background-color: transparent;
        font-size: 26px;
        font-weight: bold;
        text-align: center;
        height: 100%;
      }
    `
  ]
})
export class ModuleEditFormComponent implements OnInit {
  @Input()
  public module: Module;

  @Input()
  public MAC: string;

  @Input()
  public groupID: string;

  @Input()
  public order: number;

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

  public title: string;

  constructor(
    public settings: SettingsService,
    private http: HttpClient // private database: DatabaseService
  ) {}

  ngOnInit() {}

  public buttonIsClicked(): void {
    this.newTitleInput = this.module.name;
    this.isActive = true;
  }

  public confirmEditAction(): void {
    console.log(this.MAC);
    if (this.newTitleInput === this.module.name) {
      this.isHover = false;
      return;
    }
    this.isSendingRequest = true;
    // tslint:disable-next-line:max-line-length
    this.http
      .get(
        `https://us-central1-fb-demo-a57e3.cloudfunctions.net/changeModuleName?MAC=${this.module.MAC}&name=${this.newTitleInput}`
      )
      .subscribe(() => {
        this.isHover = false;
        this.isSendingRequest = false;
      });
  }
}
