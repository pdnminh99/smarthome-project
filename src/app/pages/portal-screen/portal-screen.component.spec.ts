import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalScreenComponent } from './portal-screen.component';

describe('PortalScreenComponent', () => {
  let component: PortalScreenComponent;
  let fixture: ComponentFixture<PortalScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
