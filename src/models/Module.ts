import { AngularFireDatabase } from '@angular/fire/database';
import { Status } from './Enums';
import { ChartsComponent } from 'src/app/components/charts/charts.component';

export class Module {

  alertThemeInterval;
  isAlert = false;
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

  private STATUS = Status.SAFE;

  public get status(): Status {
    return this.STATUS;
  }

  public set status(value: Status) {
    switch (value) {
      case Status.OFF:
      case Status.SAFE:
      case Status.DISCONNECT:
        if (this.STATUS === Status.FIRE || this.STATUS === Status.SMOKE) {
          clearInterval(this.alertThemeInterval);
          // console.log(`Interval cleared`);
          this.isAlert = false;
        }
        break;
      case Status.SMOKE:
      case Status.FIRE:
        if (this.STATUS !== Status.SMOKE && this.STATUS !== Status.FIRE) {
          this.alertThemeInterval = setInterval(() => {
            this.isAlert = !this.isAlert;
            // console.log(this.isAlert);
          }, 1000);
        }
        break;
      default:
        if (this.STATUS === Status.FIRE || this.STATUS === Status.SMOKE) {
          clearInterval(this.alertThemeInterval);
          // console.log(`Interval cleared`);
          this.isAlert = false;
        }
        break;
    }
    this.STATUS = value;
  }

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
      case Status.OFF:
        return 'poweroff';
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
      case Status.OFF:
        return 'Turned OFF';
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
    '0': Status.OFF,
    '1': Status.SAFE,
    '2': Status.SMOKE,
    '3': Status.FIRE
  };

  constructor(public _MAC: string, private db: AngularFireDatabase, private chart: ChartsComponent) {
    var date = new Date();
    db.list(`modules/${this.MAC}`).snapshotChanges().subscribe(snapshots => {
      // @ts-ignore
      this.status = this.statusMap[snapshots[2].payload.val()];
      // @ts-ignore
      const data = snapshots[4].payload.val().split(' ');
      this.temperature = parseFloat(data[0]);
      this.humidity = parseFloat(data[1]);
      // @ts-ignore
      this.isLight = snapshots[1].payload.val();
      // console.log(`typeof ${snapshots[1].payload.val()} is ${typeof snapshots[1].payload.val()}\n${this.isLight}`);
      // @ts-ignore
      this._NAME = snapshots[3].payload.val();
      var time = `${date.getHours}:${date.getMinutes}`
      chart = new ChartsComponent();
      chart.updateChart(this.temperature, this.humidity, time, time);
    });
  }

  public switchLight() {
    this.isLight = !this.isLight;
    this.db.list(`modules`).update(`${this._MAC}`, { led: this.isLight }).catch(error => console.log(error));
  }

}
