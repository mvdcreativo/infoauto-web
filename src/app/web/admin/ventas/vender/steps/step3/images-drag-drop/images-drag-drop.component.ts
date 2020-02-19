import { Component, OnInit, AfterViewInit, SimpleChanges, OnChanges, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PublishService } from '../../../../services/publish.service';
import { Images, Product } from 'src/app/interfaces/product';
import { Observable } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'images-drag-drop',
  templateUrl: './images-drag-drop.component.html',
  styleUrls: ['./images-drag-drop.component.scss']
})
export class ImagesDragDropComponent implements OnInit {
  @Input('images') images: Images[];
  @Input('publication')publication : Product;
  publication_res: Object;
  progress: number;
  showDelete : boolean = false;

  constructor(
    private _publishService: PublishService,

  ) { }

  ngOnInit(): void {

    console.log(this.images);

  }



  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
    console.log(this.images);
    const imagePosition = this.images.map((v,i)=> {
      return {id: v.id , position: i}
    })
    console.log(imagePosition);

    this._publishService.updateImage(imagePosition)

  }


  uploadImage(e) {

    console.log(e);
    
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = <FileList>e.target.files;

      const fileNames = [];
      // console.log(selectedFiles);

      // console.log(this.files);

      this._publishService.uploadProductImage(this.publication.id, selectedFiles)
        .subscribe(
          (event: HttpEvent<Object>) => {

            // console.log(event);
            if (event.type === HttpEventType.Response) {
              console.log('Upload Concluído');
              console.log(event.body);
              this._publishService.publicationSubject$.next(event.body);
              
            } else if (event.type === HttpEventType.UploadProgress) {
              const percentDone = Math.round((event.loaded * 100) / event.total);
              // console.log('Progresso', percentDone);
              this.progress = percentDone;
            }
          }
        )
    }

  }


 
  removeImage(id: number){
    this._publishService.removeImageId(id)
  }


}
