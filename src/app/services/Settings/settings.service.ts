import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  // tslint:disable-next-line:variable-name
  private _isFarenheit = false;

  public get isFarenheit(): boolean {
    return this._isFarenheit;
  }

  public set isFarenheit(value: boolean) {
    this._isFarenheit = value;
    localStorage.setItem("temp", this._isFarenheit ? "farenheit" : "celsius");
  }

  public isCollapsed = false;

  private isDarkTheme = false;

  public get theme(): string {
    return this.isDarkTheme ? "dark" : "light";
  }

  public get isDark(): boolean {
    return this.isDarkTheme;
  }

  public set isDark(value: boolean) {
    this.isDarkTheme = value;
    localStorage.setItem("theme", this.theme);
  }

  constructor() {
    const localTheme = localStorage.getItem("theme");
    const temp = localStorage.getItem("temp");
    if (localTheme === null) {
      this.isDark = false;
    } else {
      this.isDarkTheme = localTheme !== "light";
    }
    if (temp === null) {
      this.isFarenheit = false;
    } else {
      this._isFarenheit = temp === "farenheit";
    }
  }

  // switchTheme(): void {
  //   this.theme = this.theme === 'light' ? 'dark' : 'light';
  //   localStorage.setItem('theme', this.theme);
  // }
}
