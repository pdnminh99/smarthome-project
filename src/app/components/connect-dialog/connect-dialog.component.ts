import { Component, OnInit, Inject } from "@angular/core";

@Component({
  selector: "app-connect-dialog",
  templateUrl: "./connect-dialog.component.html",
  styleUrls: ["./connect-dialog.component.scss"]
})
export class ConnectDialogComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _text: string;
  public get text(): string {
    return this._text;
  }

  public set text(value: string) {
    this._text = value;
  }

  constructor() // public dialogRef: MatDialogRef<ConnectDialogComponent>,
  // @Inject(MAT_DIALOG_DATA) public data: any
  {
    // console.log(data.home);
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  ngOnInit() {}
}
