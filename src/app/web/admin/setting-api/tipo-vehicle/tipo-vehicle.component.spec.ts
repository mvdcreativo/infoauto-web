import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoVehicleComponent } from './tipo-vehicle.component';

describe('TipoVehicleComponent', () => {
  let component: TipoVehicleComponent;
  let fixture: ComponentFixture<TipoVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
