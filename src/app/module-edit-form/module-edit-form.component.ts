import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NavigationService} from '../../services/Navigation/navigation.service';
import {SettingsService} from '../../services/Settings/settings.service';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../../services/Database/database.service';
import {Module} from '../../models/Module';

@Component({
  selector: 'app-module-edit-form',
  templateUrl: './module-edit-form.component.html',
  styleUrls: ['./module-edit-form.component.scss']
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

  @ViewChild('textbox')
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

  public title: string;

  constructor(
    public settings: SettingsService,
    private http: HttpClient,
    // private database: DatabaseService
  ) {
  }

  ngOnInit() {
  }

  public buttonIsClicked(): void {
    this.newTitleInput = this.module.name;
    this.isActive = true;
  }

  public confirmEditAction(): void {
    console.log(this.MAC);
    if (
      this.newTitleInput === this.module.name
    ) {
      this.isHover = false;
      return;
    }
    this.isSendingRequest = true;
    // tslint:disable-next-line:max-line-length
    this.http.get(`https://us-central1-fb-demo-a57e3.cloudfunctions.net/changeModuleName?MAC=${this.module.MAC}&name=${this.newTitleInput}`).subscribe(response => {
      this.isHover = false;
      this.isSendingRequest = false;
    });
  }

}
