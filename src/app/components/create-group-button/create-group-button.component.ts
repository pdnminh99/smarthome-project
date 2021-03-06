import { Component, Input, OnInit } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { DatabaseService } from "../../services/Database/database.service";

@Component({
  selector: "app-create-group-button",
  templateUrl: "./create-group-button.component.html",
  styleUrls: ["./create-group-button.component.scss"]
})
export class CreateGroupButtonComponent implements OnInit {
  isSuccess = false;
  isVisible = false;
  inputICO = "android";
  groupName: string;
  icons = [
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

  @Input()
  isCollapsed: boolean;

  isLoading: boolean;

  constructor(
    private db: AngularFireDatabase,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {}

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    // console.log(this.databaseService.navigation.length);
    // console.log(this.databaseService.UUID);
    this.isLoading = true;
    this.db
      .list(`users1/${this.databaseService.UUID}/homes`)
      .set(this.databaseService.navigation.length.toString(), {
        name: this.groupName,
        icon: this.inputICO
      })
      .then(value => {
        this.isSuccess = true;
        setTimeout(() => {
          this.isLoading = false;
          this.isVisible = false;
          this.isSuccess = false;
          this.groupName = "";
          this.inputICO = "android";
        }, 2000);
      });
  }
}
