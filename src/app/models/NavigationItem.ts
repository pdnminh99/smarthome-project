export class NavigationItem {
  public order: number;

  private ID: string;

  public get id(): string {
    return this.ID;
  }

  public set id(value: string) {
    this.ID = value;
    this.routeURL = `house/${this.order}`;
  }

  public title: string;
  public icon: string;
  public routeURL: string;

  constructor(title: string, icon: string, id: string, order: number) {
    this.title = title;
    this.icon = icon;
    this.order = order;
    this.id = id;
  }
}
