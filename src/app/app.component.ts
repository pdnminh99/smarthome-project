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

  // personalizeNavigation: Array<NavigationItem>;
  // groupsNavigation: Array<NavigationItem>;

  constructor() {
    // this.personalizeNavigation = new Array<NavigationItem>();
    // this.groupsNavigation = new Array<NavigationItem>();
    // this.personalizeNavigation.push(new NavigationItem('Profile', 'profile', '/profile'));
    // this.personalizeNavigation.push(new NavigationItem('Settings', 'setting', '/setting'));
    // this.groupsNavigation.push(new NavigationItem('Villa 1', 'home', '/villa1'));
    // this.groupsNavigation.push(new NavigationItem('Villa 2', 'home', '/villa2'));
    // this.groupsNavigation.push(new NavigationItem('Villa 3', 'home', '/villa3'));
    // console.log(this.groupsNavigation.length);
    // console.log(this.personalizeNavigation.length);
  }

  // constructor(db: AngularFireDatabase) {
  //   db.list('/users1/ggID').snapshotChanges().subscribe((snapshots) => {
  //     console.log(snapshots);
  //   });
  // }
}
