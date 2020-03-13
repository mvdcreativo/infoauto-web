import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GalleryComponent, ImageItem, GalleryItem, GalleryConfig } from '@ngx-gallery/core';
import { Images } from 'src/app/interfaces/product';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'detalle-gallery',
  templateUrl: './detalle-gallery.component.html',
  styleUrls: ['./detalle-gallery.component.scss']
})
export class DetalleGalleryComponent implements OnInit {
  @Input('images') images: ImageItem[];

  @ViewChild(GalleryComponent) gallery: GalleryComponent;


  
  constructor() { }

  ngOnInit() {

  }

}


