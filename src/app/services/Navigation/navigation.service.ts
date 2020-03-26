import { Injectable } from "@angular/core";
import { isNullOrUndefined } from "util";
import { NavigationItem } from "src/app/models/NavigationItem";

@Injectable({
  providedIn: "root"
})
export class NavigationService {
  private localGroupID: string;
  private localOrder: number;
  private localTitle: string;
  private localIcon: string;

  public get groupID(): string {
    return this.localGroupID;
  }

  public set groupID(state: string) {
    if (isNullOrUndefined(this.localGroupID) || state !== this.groupID) {
      this.localGroupID = state;
    }
  }

  public get order(): number {
    return this.localOrder;
  }

  public set order(state: number) {
    if (isNullOrUndefined(this.order) || state !== this.order) {
      this.localOrder = state;
    }
  }

  public get title(): string {
    return this.localTitle;
  }

  public set title(state: string) {
    if (isNullOrUndefined(this.title) || state !== this.title) {
      this.localTitle = state;
    }
  }

  public set icon(state: string) {
    if (isNullOrUndefined(this.localIcon) || state !== this.icon) {
      this.localIcon = state;
    }
  }
  public get icon(): string {
    return this.localIcon;
  }

  constructor() {}

  changeNavigation(destination: NavigationItem) {
    this.title = destination.title;
    this.groupID = destination.id;
    this.icon = destination.icon;
    this.order = destination.order;
  }

  toString() {
    return `
    GroupID: ${this.groupID};
    Title: ${this.title};
    Order: ${this.order};
    Icon: ${this.icon};
    `;
  }
}
