import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandModelPopularComponent } from './brand-model-popular.component';

describe('BrandModelPopularComponent', () => {
  let component: BrandModelPopularComponent;
  let fixture: ComponentFixture<BrandModelPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandModelPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandModelPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
