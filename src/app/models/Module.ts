import { AngularFireDatabase } from "@angular/fire/database";
import { Motion, Status } from "./Enums";
import { ChartsComponent } from "src/app/components/charts/charts.component";
import { isUndefined } from "util";

export class Module {
  alertThemeInterval;
  isAlert = false;
  private _TEMP_HUMID: string;

  set temp_humid(value: string) {
    if (value === "") {
      this.temperature = 0;
      this.humidity = 0;
    } else {
      const data = value.split(" ");
      this.temperature = parseFloat(data[0]);
      this.humidity = parseFloat(data[1]);
    }
  }

  temperature = 0;

  public get temperatureInFarenheit(): number {
    return (this.temperature * 9) / 5 + 32;
  }

  private privatePreviousTemperature = 0;

  public get previousTemperature(): number {
    return this.privatePreviousTemperature;
  }

  private privatePreviousHumidity = 0;

  public get previousHumidity(): number {
    return this.privatePreviousHumidity;
  }

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
          }, 1000);
        }
        break;
      default:
        if (this.STATUS === Status.FIRE || this.STATUS === Status.SMOKE) {
          clearInterval(this.alertThemeInterval);
          this.isAlert = false;
        }
        break;
    }
    this.STATUS = value;
  }

  public get isDanger(): boolean {
    return this.status === Status.FIRE || this.status === Status.SMOKE;
  }

  public get statusToIcon(): string {
    switch (this.status) {
      case Status.DISCONNECT:
        return "disconnect";
      case Status.FIRE:
        return "fire";
      case Status.SAFE:
        return "safety";
      case Status.SMOKE:
        return "alert";
      case Status.OFF:
        return "poweroff";
      default:
        return "poweroff";
    }
  }

  public get statusToColor(): string {
    switch (this.status) {
      case Status.OFF:
      case Status.DISCONNECT:
        return "#83868D";
      case Status.FIRE:
        return "red";
      case Status.SMOKE:
        return "yellow";
      case Status.SAFE:
        return "green";
    }
  }

  public get statusToString(): string {
    switch (this.status) {
      case Status.DISCONNECT:
        return "Not connected";
      case Status.FIRE:
        return "Fire alerted";
      case Status.SAFE:
        return "Safe";
      case Status.SMOKE:
        return "Smoke alerted";
      case Status.OFF:
        return "Turned OFF";
      default:
        return "Off";
    }
  }

  private _NAME: string;

  get name(): string {
    return this._NAME;
  }

  get MAC(): string {
    return this._MAC;
  }

  private MOTION: Motion;

  public get motion(): Motion {
    return this.MOTION;
  }

  public get motionToIcon(): string {
    switch (this.motion) {
      case Motion.DISCONNECT:
        return "disconnect";
      case Motion.MOTION:
        return "loading";
      case Motion.NO_MOTION:
        return "line";
      default:
        return "disconnect";
    }
  }

  public get motionToColor(): string {
    switch (this.motion) {
      case Motion.MOTION:
        return "green";
      case Motion.DISCONNECT:
      case Motion.NO_MOTION:
      default:
        return "#83868D";
    }
  }

  public get motionToString(): string {
    switch (this.motion) {
      case Motion.DISCONNECT:
        return "No Connection";
      case Motion.MOTION:
        return "Motion Detected";
      case Motion.NO_MOTION:
        return "No Motion";
      default:
        return "Unknown Motion Value";
    }
  }

  private hasMotionMap = {
    x: Motion.DISCONNECT,
    0: Motion.NO_MOTION,
    1: Motion.MOTION
  };

  private statusMap = {
    x: Status.DISCONNECT,
    0: Status.OFF,
    1: Status.SAFE,
    2: Status.SMOKE,
    3: Status.FIRE
  };

  private temperatureUpdateInterval: number;

  private humidityUpdateInterval: number;

  constructor(
    public _MAC: string,
    private db: AngularFireDatabase,
    private chart: ChartsComponent
  ) {
    db.list(`modules/${this.MAC}`)
      .snapshotChanges()
      .subscribe(snapshots => {
        // @ts-ignore
        this.MOTION = this.hasMotionMap[snapshots[1].payload.val()];
        // @ts-ignore
        this.status = this.statusMap[snapshots[3].payload.val()];
        // @ts-ignore
        const data = snapshots[5].payload.val().split(" ");
        if (parseFloat(data[0]) !== this.temperature) {
          this.privatePreviousTemperature = this.temperature;
          this.temperature = parseFloat(data[0]);
          if (!isUndefined(this.temperatureUpdateInterval)) {
            clearTimeout(this.temperatureUpdateInterval);
            this.temperatureUpdateInterval = undefined;
          }
          this.temperatureUpdateInterval = setTimeout(
            () => (this.privatePreviousTemperature = this.temperature),
            10000
          );
        }
        if (parseFloat(data[1]) !== this.humidity) {
          this.privatePreviousHumidity = this.humidity;
          this.humidity = parseFloat(data[1]);
          if (!isUndefined(this.humidityUpdateInterval)) {
            clearTimeout(this.humidityUpdateInterval);
            this.temperatureUpdateInterval = undefined;
          }
          this.humidityUpdateInterval = setTimeout(
            () => (this.privatePreviousHumidity = this.humidity),
            10000
          );
        }
        // @ts-ignore
        this.isLight = snapshots[2].payload.val();
        // @ts-ignore
        this._NAME = snapshots[4].payload.val();
      });
  }

  public switchLight() {
    this.isLight = !this.isLight;
    this.db
      .list(`modules`)
      .update(`${this._MAC}`, { led: this.isLight })
      .catch(error => console.log(error));
  }
}
