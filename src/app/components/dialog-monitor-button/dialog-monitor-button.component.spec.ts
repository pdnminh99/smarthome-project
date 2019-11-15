import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMonitorButtonComponent } from './dialog-monitor-button.component';

describe('DialogMonitorButtonComponent', () => {
  let component: DialogMonitorButtonComponent;
  let fixture: ComponentFixture<DialogMonitorButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMonitorButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMonitorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
