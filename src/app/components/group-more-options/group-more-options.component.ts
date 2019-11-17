import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../../../services/Database/database.service';

@Component({
  selector: 'app-group-more-options',
  templateUrl: './group-more-options.component.html',
  styleUrls: ['./group-more-options.component.scss']
})
export class GroupMoreOptionsComponent implements OnInit {

  isSuccess = false;
  errorMessage = '';
  isDeleteModalVisible = false;
  isEditModalVisible = false;
  inputString = '';
  isLoading = false;

  @Input()
  groupID: string;

  @Input()
  name: string;
  newName: string;

  @Input()
  icon: string;
  newIcon: string;

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
    'slack',
  ];

  @Input()
  order: number;

  constructor(private router: Router, private http: HttpClient, private database: DatabaseService) {
  }

  ngOnInit() {
    this.newName = this.name;
    this.newIcon = this.icon;
  }

  handleDeleteModalCancel() {
    this.isDeleteModalVisible = false;
    this.errorMessage = '';
    this.isLoading = false;
    this.inputString = '';
  }

  handleDeleteModalOk() {
    this.isLoading = true;
    if (this.inputString.length === 0 || this.inputString !== this.name) {
      this.errorMessage = 'Your input does not match the name. Please try again.';
      this.isLoading = false;
      return;
    }
    // tslint:disable-next-line:max-line-length
    this.http.get(`https://us-central1-fb-demo-a57e3.cloudfunctions.net/deleteGroup?order=${this.order}&UUID=${this.database.UUID}`).subscribe(response => {
      console.log(response);
      this.errorMessage = '';
      this.isSuccess = true;
      setTimeout(() => {
        this.isDeleteModalVisible = false;
        this.isLoading = false;
        this.router.navigateByUrl('/profile').catch(error => console.log(error));
        this.isSuccess = false;
      }, 2000);
    });
  }

  handleEditModalCancel() {
    this.isEditModalVisible = false;
    this.errorMessage = '';
    this.isLoading = false;
  }

  handleEditModalOk() {
    this.isLoading = true;
    if (this.name === this.newName && this.icon === this.newIcon) {
      this.errorMessage = 'Found no changes.';
      this.isLoading = false;
      return;
    }
    // tslint:disable-next-line:max-line-length
    this.http.get(`https://us-central1-fb-demo-a57e3.cloudfunctions.net/changeGroupName?UUID=${this.database.UUID}&order=${this.order}&name=${this.newName}&icon=${this.newIcon}`).subscribe(response => {
      console.log(response);
      this.errorMessage = '';
      this.isSuccess = true;
      setTimeout(() => {
        this.isEditModalVisible = false;
        this.isLoading = false;
        this.router.navigateByUrl(`/house/${this.groupID}/${this.newName}/${this.order}`).catch(error => console.log(error));
        this.isSuccess = false;
      }, 2000);
    });
  }

}
