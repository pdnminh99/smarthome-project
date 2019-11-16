import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {NavigationItem} from '../../models/NavigationItem';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private userSubscription = this.db.list('users1/ggID').snapshotChanges();
  public navigation = new Array<NavigationItem>();

  constructor(private db: AngularFireDatabase) {
    this.userSubscription.subscribe(snapshots => {
      const homes = snapshots[1].payload.val();
      // @ts-ignore
      this.navigation = [...homes.map(house => new NavigationItem(house.name, house.icon, house.id))];
    });
  }
}
