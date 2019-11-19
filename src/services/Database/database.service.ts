import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { NavigationItem } from '../../models/NavigationItem';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public UUID: string;
  private userSubscription: any;
  public navigation: Array<NavigationItem>;
  public email: string;
  public name: string;
  public photoURL: string;

  public checkIfExisted(user: { uid: string, email: string, name: string, photoURL: string }) {
    this.db.list(`users1/${user.uid}`).query.once('value').then(value => {
      if (value.val() == null) {
        this.db.list('users1').set(user.uid, { "email": user.email, "homes": { "0": "0" }, "name": user.name, "photoURL": user.photoURL });
      }
    });
  }

  public getUserData(user: { uid: string, email: string, name: string, photoURL: string }) {
    this.UUID = user.uid;
    this.email = user.email;
    this.name = user.name;
    this.photoURL = user.photoURL;
    console.log(`User ${this.UUID}`);
    this.userSubscription = this.db.list(`users1/${this.UUID}`).snapshotChanges();
    this.db.list(`users1/${this.UUID}`).query.once('value').then(value => {
      if (value.val() === null) {
        return this.db.list('users1').set(user.uid, { "email": user.email, "name": user.name, "photoURL": user.photoURL });
      }
      return;
    }).then(_ => {
      this.userSubscription.subscribe((snapshots: { payload: { val: () => void; }; }[]) => {
        // // @ts-ignore
        // this.email = snapshots[0].payload.val();
        // // @ts-ignore
        // this.name = snapshots[2].payload.val();
        // // @ts-ignore
        // this.photoURL = snapshots[3].payload.val();
        console.log(this.UUID);
        let homes = snapshots[1].payload.val();
        this.navigation = [];
        console.log(`Navigation length is ${this.navigation.length}`);
        if (typeof homes !== 'string') {
          // @ts-ignore
          for (let iterator in homes) {
            // console.log(iterator);
            this.navigation.push(new NavigationItem(homes[iterator].name, homes[iterator].icon, homes[iterator].id, Number(iterator)));
          }
          console.log(`Navigation length of ${homes} is ${this.navigation.length}`);
        } else {
          this.navigation = [];
          console.log(`Navigation length is ${this.navigation.length}`);
        }
        this.router.navigate(["portal/profile"]);
        // @ts-ignore
        // this.navigation = [...homes.map(house => new NavigationItem(house.name, house.icon, house.id))];
      });
    })
  }

  constructor(private db: AngularFireDatabase, private router: Router) {
    this.navigation = new Array<NavigationItem>();
    // this.checkIfExisted();
    // this.getUserData();
  }
}
