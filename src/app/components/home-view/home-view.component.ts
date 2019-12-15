import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from '../../../models/Module';
import { Observable } from 'rxjs';
import { DatabaseService } from '../../../services/Database/database.service';
import { SettingsService } from '../../../services/Settings/settings.service';
import { HttpClient } from '@angular/common/http';
import { ChartsComponent } from '../charts/charts.component';
import { isNullOrUndefined, isUndefined } from 'util';
import { NavigationService } from 'src/services/Navigation/navigation.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  modules: Array<Module>;

  searchInput = '';

  public get modulesMatchSearchInput(): Module[] {
    if (isNullOrUndefined(this.searchInput) || this.searchInput.length === 0) {
      const modulesOnFire: Module[] = new Array<Module>();
      this.modules.forEach(module => {
        if (module.isDanger) {
          modulesOnFire.unshift(module);
        } else {
          modulesOnFire.push(module);
        }
      });
      return modulesOnFire;
    }
    // tslint:disable-next-line:max-line-length
    return this.modules.filter(
      value =>
        value.MAC.includes(this.searchInput) ||
        value.name.includes(this.searchInput) ||
        value.statusToString.includes(this.searchInput)
    );
  }

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
      this.errorMessage =
        'MAC address cannot be longer than 12 hexadecimal characters';
    } else if (
      this.errorMessage ===
      'MAC address cannot be longer than 12 hexadecimal characters'
    ) {
      this.errorMessage = '';
    }
    if (
      keysCount === 3 ||
      keysCount === 6 ||
      keysCount === 9 ||
      keysCount === 12 ||
      keysCount === 15
    ) {
      // tslint:disable-next-line:max-line-length
      this.privateInputString =
        this.inputString.substr(0, this.inputString.length - 1) +
        ':' +
        this.inputString[this.inputString.length - 1];
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
    public navigation: NavigationService
  ) {
    this.modules = new Array<Module>();
    this.route.params.subscribe(params => {
      this.modules = [];
      if (!isUndefined(navigation.groupID)) {
        // @ts-ignore
        this.databaseObservable = this.db
          .list(`homes/${this.navigation.groupID}`)
          .snapshotChanges()
          .subscribe(
            snapshot =>
              // @ts-ignore
              (this.modules = snapshot.map(payload => {
                // console.log(payload.payload.val());
                // @ts-ignore
                return new Module(payload.payload.val(), this.db);
              }))
          );
      }
    });
  }

  onSearchEnter(value: string) {
    this.searchInput = value;
  }

  backSpacePressed() {
    const stringLength = this.inputString.length;
    if (this.inputString[stringLength - 2] === ':') {
      this.privateInputString = this.inputString.substr(0, stringLength - 1);
    }
  }

  handleCancel() {
    this.isVisible = false;
    this.isLoading = false;
    this.errorMessage = '';
    this.isSuccess = false;
  }

  handleOk() {
    this.isLoading = true;
    if (
      !/(([0-9]|[A-F]){2}:){5}([0-9]|[A-F]){2}/.test(this.inputString) ||
      this.inputString.length !== 17
    ) {
      this.errorMessage = 'Invalid MAC address. Please try again.';
      this.isLoading = false;
      return;
    }
    for (const module of this.modules) {
      if (module.MAC === this.inputString) {
        this.errorMessage = `Module ${this.inputString} already existed in ${this.navigation.title}`;
        this.isLoading = false;
        return;
      }
    }
    this.db
      .list(`modules/${this.inputString}`)
      .query.once('value')
      .then(value => {
        if (isNullOrUndefined(value.val())) {
          throw Error('MAC address not available.');
        }
        // tslint:disable-next-line: max-line-length
        let URL = `https://us-central1-fb-demo-a57e3.cloudfunctions.net/connectModule?UUID=${this.database.UUID}&MAC=${this.inputString}&order=${this.navigation.order}`;
        if (!isNullOrUndefined(this.navigation.groupID)) {
          URL += `&id=${this.navigation.groupID}`;
        }
        // tslint:disable-next-line: deprecation
        this.http.get(URL).subscribe(response => {
          // @ts-ignore
          this.navigation.id = response.error.id;
          // console.log(`After connect this.id = ${this.id}`);
          this.isSuccess = true;
          setTimeout(() => {
            // this.router.navigateByUrl(`portal/house/${this.navigation.order}`).catch(error => console.log(error));
            this.isLoading = false;
            this.inputString = '';
            this.isVisible = false;
            this.isSuccess = false;
          }, 2000);
        });
      })
      .catch(error => {
        this.errorMessage = 'MAC address not available.';
        this.isLoading = false;
      });
  }

  ngOnInit() {}
}
