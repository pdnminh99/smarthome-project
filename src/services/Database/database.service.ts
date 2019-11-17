import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {NavigationItem} from '../../models/NavigationItem';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private userSubscription = this.db.list('users1/ggID').snapshotChanges();
  public navigation = new Array<NavigationItem>();
  public UUID = 'ggID';
  public email: string;
  public name: string;
  public photoURL: string;

  constructor(private db: AngularFireDatabase) {
    this.userSubscription.subscribe(snapshots => {
      // @ts-ignore
      this.email = snapshots[0].payload.val();
      // @ts-ignore
      this.name = snapshots[2].payload.val();
      // @ts-ignore
      this.photoURL = snapshots[3].payload.val();
      const homes = snapshots[1].payload.val();
      this.navigation = [];
      // @ts-ignore
      for (let iterator in homes) {
        // console.log(iterator);
        this.navigation.push(new NavigationItem(homes[iterator].name, homes[iterator].icon, homes[iterator].id, Number(iterator)));
      }
      // @ts-ignore
      // this.navigation = [...homes.map(house => new NavigationItem(house.name, house.icon, house.id))];
    });
  }
}
