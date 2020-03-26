import { Component, Input, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DatabaseService } from "../../services/Database/database.service";

@Component({
  selector: "app-extent-module-control",
  templateUrl: "./extent-module-control.component.html",
  styleUrls: ["./extent-module-control.component.scss"]
})
export class ExtentModuleControlComponent implements OnInit {
  isSuccess = false;
  errorMessage = "";
  isDeleteModalVisible = false;
  isLoading = false;

  @Input()
  name: string;

  @Input()
  order: number;

  @Input()
  groupID: string;

  @Input()
  MAC: string;

  constructor(private http: HttpClient, private database: DatabaseService) {}

  ngOnInit() {}

  handleDeleteModalCancel() {
    this.isDeleteModalVisible = false;
    this.errorMessage = "";
    this.isLoading = false;
  }

  handleDeleteModalOk() {
    this.isLoading = true;
    // tslint:disable-next-line:max-line-length
    this.http
      .get(
        `https://us-central1-fb-demo-a57e3.cloudfunctions.net/disconnectModule?UUID=${this.database.UUID}&order=${this.order}&id=${this.groupID}&MAC=${this.MAC}`
      )
      .subscribe(() => {
        // console.log(response);
        this.errorMessage = "";
        this.isSuccess = true;
        setTimeout(() => {
          this.isDeleteModalVisible = false;
          this.isLoading = false;
          this.isSuccess = false;
        }, 2000);
      });
  }
}
