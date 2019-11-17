import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public isCollapsed = false;

  private isDarkTheme = false;

  public get theme(): string {
    return this.isDarkTheme ? 'dark' : 'light';
  }

  public get isDark(): boolean {
    return this.isDarkTheme;
  }

  public set isDark(value: boolean) {
    this.isDarkTheme = value;
    localStorage.setItem('theme', this.theme);
  }

  constructor() {
    let localTheme = localStorage.getItem('theme');
    if (localTheme === null) {
      this.isDark = false;
    } else {
      this.isDarkTheme = localTheme !== 'light';
    }
  }

  // switchTheme(): void {
  //   this.theme = this.theme === 'light' ? 'dark' : 'light';
  //   localStorage.setItem('theme', this.theme);
  // }
}
