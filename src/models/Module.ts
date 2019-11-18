import {AngularFireDatabase} from '@angular/fire/database';
import {Status} from './Enums';

export class Module {

  // alertThemeInterval: any;
  theme: string;
  private _TEMP_HUMID: string;

  set temp_humid(value: string) {
    if (value === '') {
      this.temperature = 0;
      this.humidity = 0;
    } else {
      const data = value.split(' ');
      this.temperature = parseFloat(data[0]);
      this.humidity = parseFloat(data[1]);
    }
  }

  temperature = 0;
  humidity = 0;
  isLight = false;

  status = Status.SAFE;

  public get statusToIcon(): string {
    switch (this.status) {
      case Status.DISCONNECT:
        return 'disconnect';
      case Status.FIRE:
        return 'fire';
      case Status.SAFE:
        return 'safety';
      case Status.SMOKE:
        return 'alert';
      default:
        return 'poweroff';
    }
  }

  public get statusToString(): string {
    switch (this.status) {
      case Status.DISCONNECT:
        return 'Not connected';
      case Status.FIRE:
        return 'Fire alerted';
      case Status.SAFE:
        return 'Safe';
      case Status.SMOKE:
        return 'Smoke alerted';
      default:
        return 'Off';
    }
  }

  private _NAME: string;

  get name(): string {
    return this._NAME;
  }

  get MAC(): string {
    return this._MAC;
  }

  private statusMap = {
    'x': Status.DISCONNECT,
    '0': Status.SAFE,
    '1': Status.SAFE,
    '2': Status.SMOKE,
    '3': Status.FIRE
  };

  constructor(public _MAC: string, private db: AngularFireDatabase) {
    db.list(`modules/${this.MAC}`).snapshotChanges().subscribe(snapshots => {
      // @ts-ignore
      this.status = this.statusMap[snapshots[2].payload.val()];
      // @ts-ignore
      // if (status !== Status.SMOKE && status !== Status.FIRE) {
      //   if (this.alertThemeInterval !== undefined) {
      //     this.alertThemeInterval.clearInterval();
      //   }
      //   this.theme = '';
      // } else {
      //   this.alertThemeInterval = setInterval(() => {
      //     this.theme = this.theme === 'alert-card' ? '' : 'alert-card';
      //     console.log(this.theme);
      //   }, 1000);
      // }
      // @ts-ignore
      const data = snapshots[4].payload.val().split(' ');
      this.temperature = parseFloat(data[0]);
      this.humidity = parseFloat(data[1]);
      this.isLight = snapshots[2].payload.val() === `true`;
      // @ts-ignore
      this._NAME = snapshots[3].payload.val();
    });
  }

  public switchLight() {
    this.isLight = !this.isLight;
    this.db.list(`modules`).update(`${this._MAC}`, {led: this.isLight}).catch(error => console.log(error));
  }

}
