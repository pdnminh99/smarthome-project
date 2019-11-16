import { Component, Inject, OnInit } from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-connect-dialog',
  template: `
      <h1>{{ this.text }}</h1>

      <mat-form-field class="example-full-width">
          <input matInput placeholder="MAC address" [(ngModel)]="text"/>
      </mat-form-field>
      <button mat-raised-button color="primary">SAVE</button>
      <button mat-stroked-button color="primary">CLOSE</button>
  `,
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

  constructor(public dialogRef: MatDialogRef<ConnectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data.home);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
