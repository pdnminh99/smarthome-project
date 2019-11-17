import {Component, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DatabaseService} from '../../../services/Database/database.service';

@Component({
  selector: 'app-extent-module-control',
  templateUrl: './extent-module-control.component.html',
  styleUrls: ['./extent-module-control.component.scss']
})
export class ExtentModuleControlComponent implements OnInit {

  isSuccess = false;
  errorMessage = '';
  isDeleteModalVisible = false;
  isEditModalVisible = false;
  isLoading = false;

  @Input()
  name: string;
  newName: string;

  @Input()
  order: number;

  @Input()
  groupID: string;

  @Input()
  MAC: string;

  constructor(private router: Router, private http: HttpClient, private database: DatabaseService) {
  }

  ngOnInit() {
    this.newName = name;
  }

  handleDeleteModalCancel() {
    this.isDeleteModalVisible = false;
    this.errorMessage = '';
    this.isLoading = false;
  }

  handleDeleteModalOk() {
    this.isLoading = true;
    // tslint:disable-next-line:max-line-length
    this.http.get(`https://us-central1-fb-demo-a57e3.cloudfunctions.net/disconnectModule?UUID=${this.database.UUID}&order=${this.order}&id=${this.groupID}&MAC=${this.MAC}`).subscribe(response => {
      console.log(response);
      this.errorMessage = '';
      this.isSuccess = true;
      setTimeout(() => {
        this.isDeleteModalVisible = false;
        this.isLoading = false;
        // this.router.navigateByUrl(`/house/${this.groupID}/${this.name}`).catch(error => console.log(error));
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
    if (this.name === this.newName) {
      this.errorMessage = 'Found no changes.';
      this.isLoading = false;
      return;
    }
    // tslint:disable-next-line:max-line-length
    this.http.get(`https://us-central1-fb-demo-a57e3.cloudfunctions.net/changeModuleName?MAC=${this.MAC}&name=${this.newName}`).subscribe(response => {
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
