import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVenderComponent } from './dialog-vender.component';

describe('DialogVenderComponent', () => {
  let component: DialogVenderComponent;
  let fixture: ComponentFixture<DialogVenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
