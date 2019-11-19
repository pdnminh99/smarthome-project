import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMoreOptionsComponent } from './group-more-options.component';

describe('GroupMoreOptionsComponent', () => {
  let component: GroupMoreOptionsComponent;
  let fixture: ComponentFixture<GroupMoreOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMoreOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMoreOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
