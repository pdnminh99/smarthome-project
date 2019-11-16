import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, SnapshotAction} from '@angular/fire/database';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Module} from '../../../models/Module';
import {Observable, Subscription} from 'rxjs';
import {normalizeSlashes} from 'ts-node';
import {DatabaseService} from '../../../services/Database/database.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  id: string;
  title: string;
  modules: Array<Module>;
  databaseObservable: Observable<any[]>;
  isVisible = false;
  inputString: string;
  isLoading: boolean;

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private database: DatabaseService) {
    this.modules = new Array<Module>();
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.title = params.name;
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
