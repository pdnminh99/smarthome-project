import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from '../../../models/Module';
import { Observable } from 'rxjs';
import { DatabaseService } from '../../../services/Database/database.service';
import { SettingsService } from '../../../services/Settings/settings.service';
import { HttpClient } from '@angular/common/http';
import { ChartsComponent } from '../charts/charts.component';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  id: string;
  title: string;
  order: number;
  modules: Array<Module>;
  databaseObservable: Observable<any[]>;
  isVisible = false;
  errorMessage = '';
  isSuccess = false;
  public privateInputString: string;

  public get inputString(): string {
    return this.privateInputString;
  }

  public set inputString(value: string) {
    const keysCount = value.length;
    this.privateInputString = value.toUpperCase();
    if (keysCount > 17) {
      this.errorMessage = 'MAC address cannot be longer than 12 hexadecimal characters';
    } else if (this.errorMessage === 'MAC address cannot be longer than 12 hexadecimal characters') {
      this.errorMessage = '';
    }
    // if (keysCount === 2 || keysCount === 5 || keysCount === 8 || keysCount === 11 || keysCount === 14) {
    //   this.privateInputString += ':';
    // }
    if (keysCount === 3 || keysCount === 6 || keysCount === 9 || keysCount === 12 || keysCount === 15) {
      // tslint:disable-next-line:max-line-length
      this.privateInputString = this.inputString.substr(0, this.inputString.length - 1) + ':' + this.inputString[this.inputString.length - 1];
    }
  }

  isLoading = false;

  // tslint:disable-next-line:max-line-length
  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    public database: DatabaseService,
    public settings: SettingsService,
    private http: HttpClient,
    private router: Router,
    private chart: ChartsComponent,
  ) {
    this.modules = new Array<Module>();
    this.route.params.subscribe(params => {
      this.modules = [];
      this.id = params.id;
      this.title = params.name;
      this.order = params.order;
      if (this.id !== 'undefined') {
        // @ts-ignore
        this.databaseObservable = this.db
          .list(`homes/${this.id}`)
          .snapshotChanges()
          .subscribe(
            snapshot =>
              // @ts-ignore
              (this.modules = snapshot.map(payload => {
                // console.log(payload.payload.val());
                // @ts-ignore
                return new Module(payload.payload.val(), this.db);
              })
              )
          );
      }
    });
    this.chart.test();
  }

  backSpacePressed() {
    const stringLength = this.inputString.length;
    if (this.inputString[stringLength - 2] === ':') {
      this.privateInputString = this.inputString.substr(0, stringLength - 1);
    }
    // if (stringLength === 4 || stringLength === 7 || stringLength === 10 || stringLength === 13 || stringLength === 16) {
    //   this.inputString = this.inputString.substr(0, this.inputString.length - 1);
    // }
  }

  handleCancel() {
    this.isVisible = false;
    this.isLoading = false;
    this.errorMessage = '';
    this.isSuccess = false;
  }

  handleOk() {
    this.isLoading = true;
    if (!/(([0-9]|[A-F]){2}:){5}([0-9]|[A-F]){2}/.test(this.inputString) || this.inputString.length !== 17) {
      this.errorMessage = 'Invalid MAC address. Please try again.';
      this.isLoading = false;
      return;
    }
    for (const module of this.modules) {
      if (module.MAC === this.inputString) {
        this.errorMessage = `Module ${this.inputString} already existed in ${this.title}`;
        this.isLoading = false;
        return;
      }
    }
    this.db.list(`modules/${this.inputString}`).query.once('value').then(value => {
      if (value.val() === null) {
        throw Error('MAC address not available.');
      }
      // tslint:disable-next-line: max-line-length
      let URL = `https://us-central1-fb-demo-a57e3.cloudfunctions.net/connectModule?UUID=${this.database.UUID}&MAC=${this.inputString}&order=${this.order}`;
      if (this.id !== 'undefined') {
        URL += `&id=${this.id}`;
      }
      // tslint:disable-next-line: deprecation
      this.http.get(URL).subscribe(response => {
        console.log(response);
        // @ts-ignore
        this.id = response.error.id;
        // console.log(`After connect this.id = ${this.id}`);
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigateByUrl(`portal/house/${this.id}/${this.title}/${this.order}`).catch(error => console.log(error));
          this.isLoading = false;
          this.inputString = '';
          this.isVisible = false;
          this.isSuccess = false;
        }, 2000);
      });
    }).catch(error => {
      this.errorMessage = 'MAC address not available.';
      this.isLoading = false;
    });
  }

  ngOnInit() {
  }
}
