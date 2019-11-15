import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isActive = false;
  isCollapsed = false;

  // constructor(db: AngularFireDatabase) {
  //   db.list('/users1/ggID').snapshotChanges().subscribe((snapshots) => {
  //     console.log(snapshots);
  //   });
  // }
}
