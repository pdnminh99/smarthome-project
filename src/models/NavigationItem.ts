export class NavigationItem {
  private ID: string;

  public get id(): string {
    return this.ID;
  }

  public set id(value: string) {
    this.ID = value;
    this.routeURL = `house/${this.id}/${this.title}`;
  }

  public title: string;
  public icon: string;
  public routeURL: string;

  constructor(title: string, icon: string, id: string) {
    this.title = title;
    this.icon = icon;
    this.id = id;
  }
}
