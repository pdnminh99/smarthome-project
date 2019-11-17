import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute, Router} from '@angular/router';
import {Module} from '../../../models/Module';
import {Observable} from 'rxjs';
import {DatabaseService} from '../../../services/Database/database.service';
import {SettingsService} from '../../../services/Settings/settings.service';
import {HttpClient} from '@angular/common/http';

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
  inputString: string;
  isLoading = false;

  // tslint:disable-next-line:max-line-length
  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private database: DatabaseService,
    private settings: SettingsService,
    private http: HttpClient,
    private router: Router
  ) {
    this.modules = new Array<Module>();
    this.route.params.subscribe(params => {
      this.modules = [];
      this.id = params.id;
      this.title = params.name;
      this.order = params.order;
      console.log(`Current params ${this.id}; ${this.title}; ${this.order}`);
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
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isLoading = true;
    // tslint:disable-next-line: max-line-length
    let URL = `https://us-central1-fb-demo-a57e3.cloudfunctions.net/connectModule?UUID=ggID&MAC=${this.inputString}&order=${this.order}`;
    if (this.id !== 'undefined') {
      console.log(typeof this.id !== 'undefined');
      URL += `&id=${this.id}`;
    }
    console.log(URL);
    // tslint:disable-next-line: deprecation
    this.http.get(URL).subscribe(response => {
      console.log(response);
      this.id = response['error']['id'];
      console.log(`After connect this.id = ${this.id}`);
      this.router.navigateByUrl(`/house/${this.id}/${this.title}/${this.order}`).catch(error => console.log(error));
      // @ts-ignore
      // this.databaseObservable = this.db
      //   .list(`homes/${this.id}`)
      //   .snapshotChanges()
      //   .subscribe(
      //     snapshot =>
      //       // @ts-ignore
      //       (this.modules = [
      //         ...snapshot.map(payload => {
      //           // console.log(payload.payload.val());
      //           // @ts-ignore
      //           return new Module(payload.payload.val(), this.db);
      //         })
      //       ])
      //   );
      this.isLoading = false;
      this.inputString = '';
      this.isVisible = false;
    });
  }

  ngOnInit() {
  }
}
