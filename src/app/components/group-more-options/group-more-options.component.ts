import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from '../../services/Database/database.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';

@Component({
  selector: 'app-group-more-options',
  templateUrl: './group-more-options.component.html',
  styleUrls: ['./group-more-options.component.scss']
})
export class GroupMoreOptionsComponent implements OnInit {
  isSuccess = false;
  errorMessage = '';
  isDeleteModalVisible = false;
  inputString = '';
  isLoading = false;

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

  constructor(
    private router: Router,
    private http: HttpClient,
    private database: DatabaseService,
    public navigationService: NavigationService
  ) {}

  ngOnInit() {
  }

  handleDeleteModalCancel() {
    this.isDeleteModalVisible = false;
    this.errorMessage = '';
    this.isLoading = false;
    this.inputString = '';
  }

  handleDeleteModalOk() {
    this.isLoading = true;
    if (this.inputString.length === 0 || this.inputString !== this.navigationService.title) {
      this.errorMessage =
        'Your input does not match the name. Please try again.';
      this.isLoading = false;
      return;
    }
    // tslint:disable-next-line:max-line-length
    this.http
      .get(
        `https://us-central1-fb-demo-a57e3.cloudfunctions.net/deleteGroup?order=${this.navigationService.order}&UUID=${this.database.UUID}`
      )
      .subscribe(() => {
        // console.log(response);
        this.errorMessage = '';
        this.isSuccess = true;
        setTimeout(() => {
          this.isDeleteModalVisible = false;
          this.isLoading = false;
          this.router
            .navigateByUrl('/profile')
            .catch(error => console.log(error));
          this.isSuccess = false;
        }, 2000);
      });
  }
}
