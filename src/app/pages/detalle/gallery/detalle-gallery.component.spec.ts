import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleGalleryComponent } from './detalle-gallery.component';

describe('GalleryComponent', () => {
  let component: DetalleGalleryComponent;
  let fixture: ComponentFixture<DetalleGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
