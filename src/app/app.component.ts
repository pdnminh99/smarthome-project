import {Component} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {NavigationItem} from '../models/NavigationItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;

  personalizeNavigation: Array<NavigationItem> = [
    new NavigationItem('Profile', 'profile', ''),
    new NavigationItem('Settings', 'setting', ''),
  ];

  groupsNavigation: Array<NavigationItem> = [
    new NavigationItem('Villa 1', 'home', ''),
    new NavigationItem('Villa 2', 'home', ''),
    new NavigationItem('Villa 3', 'home', ''),
  ];

  constructor() {
  }

  // constructor(db: AngularFireDatabase) {
  //   db.list('/users1/ggID').snapshotChanges().subscribe((snapshots) => {
  //     console.log(snapshots);
  //   });
  // }
}
