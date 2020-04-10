import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesDragDropComponent } from './images-drag-drop.component';

describe('ImagesDragDropComponent', () => {
  let component: ImagesDragDropComponent;
  let fixture: ComponentFixture<ImagesDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
