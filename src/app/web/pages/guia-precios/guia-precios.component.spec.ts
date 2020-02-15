import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaPreciosComponent } from './guia-precios.component';

describe('GuiaPreciosComponent', () => {
  let component: GuiaPreciosComponent;
  let fixture: ComponentFixture<GuiaPreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaPreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
