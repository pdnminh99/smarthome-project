export class NavigationItem {
  public title: string;
  public icon: string;
  public routeURL: string;

  constructor(title: string, icon: string, routeURL: string) {
    this.title = title;
    this.icon = icon;
    this.routeURL = routeURL;
  }
}
