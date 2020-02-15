import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesosDirectosComponent } from './accesos-directos.component';

describe('AccesosDirectosComponent', () => {
  let component: AccesosDirectosComponent;
  let fixture: ComponentFixture<AccesosDirectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesosDirectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesosDirectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
