import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input('images') images: any[];

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  imagesArr : any []


  constructor() { }

  ngOnInit() {

    
    this.galleryOptions = [
      {
        width: '800px',
        height: '600px',
        thumbnailsColumns: 6,
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnailsRemainingCount: true,
        imagePercent: 85,
        thumbnailsPercent: 15,
        // imageSize: "contain",
        previewCloseOnClick: true, 
        previewCloseOnEsc: true,

        arrowPrevIcon: "fa fa-chevron-left fa-9x",
        arrowNextIcon: "fa fa-chevron-right", 
        closeIcon: "fa fa-times", 
        fullscreenIcon: "fa fa-arrows", 
        spinnerIcon: "fa fa-circle-notch", 
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        width: '400px',
        height: '200px',
        preview: false
      },
    ];

    // this.galleryImages = [
    //   {
    //     small: '',
    //     medium: '',
    //     big: ''
    //   },
    // ];
    this.cargaImages()
    console.log(this.images);
    
    console.log(this.galleryImages);
    
  }


  cargaImages(){
    this.images.forEach(image => {
      this.galleryImages.push(
        {
          small: image.url,
          medium: image.url,
          big: image.url
        }
      )
    });
  }

}


