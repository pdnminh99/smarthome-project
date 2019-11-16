import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  id: string;
  title = 'Loading ...';
  email = 'lordvoldermort@gmail.com';
  modules: string[];

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.title = params.name;
      console.log(params);
    });
  }


  ngOnInit() {
  }

}
