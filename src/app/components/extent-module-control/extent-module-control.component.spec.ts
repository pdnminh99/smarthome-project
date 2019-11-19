import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtentModuleControlComponent } from './extent-module-control.component';

describe('ExtentModuleControlComponent', () => {
  let component: ExtentModuleControlComponent;
  let fixture: ComponentFixture<ExtentModuleControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtentModuleControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtentModuleControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
