import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResReutilComponent } from './res-reutil.component';

describe('ResReutilComponent', () => {
  let component: ResReutilComponent;
  let fixture: ComponentFixture<ResReutilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResReutilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResReutilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
