import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewInfoComponent } from './home-view-info.component';

describe('HomeViewInfoComponent', () => {
  let component: HomeViewInfoComponent;
  let fixture: ComponentFixture<HomeViewInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeViewInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
