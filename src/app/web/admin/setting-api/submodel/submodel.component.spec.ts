import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodelComponent } from './submodel.component';

describe('SubmodelComponent', () => {
  let component: SubmodelComponent;
  let fixture: ComponentFixture<SubmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
