import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFireDatabase, SnapshotAction} from '@angular/fire/database';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Module} from '../../../models/Module';
import {Observable, Subscription} from 'rxjs';
import {normalizeSlashes} from 'ts-node';
import {DatabaseService} from '../../../services/Database/database.service';
import {SettingsService} from '../../../services/Settings/settings.service';

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

  // tslint:disable-next-line:max-line-length
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private database: DatabaseService, private settings: SettingsService) {
    this.modules = new Array<Module>();
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.title = params.name;
      this.order = params.order;
      console.log(`Current params ${this.id}; ${this.title}; ${this.order}`);
      // @ts-ignore
      this.databaseObservable = this.db.list(`homes/${this.id}`).snapshotChanges().subscribe(snapshot =>
        // @ts-ignore
        this.modules = [...snapshot.map(payload => {
          // console.log(payload.payload.val());
          // @ts-ignore
          return new Module(payload.payload.val(), this.db);
        })]
      );
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
  }

  ngOnInit() {
  }

}
