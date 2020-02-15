import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PublishService } from '../../../services/publish.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  formStep3: FormGroup;
  info: any;
  extras: any;
  publicationID: number;
  publication: any;
  progress: number;
  images: any;

  constructor(
    private _fb: FormBuilder,
    private _publishService: PublishService,
    private _authService: AuthService,
  ) { }

  ngOnInit() {

    this.generaFormStep3();

  }

  private generaFormStep3(){
    this.formStep3 = this._fb.group({
      extras : new FormArray([]),
      description : ['', Validators.required]
    });
  }

  submitStep3(){
    const selectedExtras = this.formStep3.value.extras
      .map((v, i) => v ? this.extras[i].id : null)
      .filter(v => v !== null);
      
    console.log(selectedExtras);

    this.info.extras = selectedExtras;
    this.info.description = this.formStep3.value.description
    console.log(this.info);
    // this.udatePublication();
  }
  



  uploadImage(e , index){
    
    if(e.target.files && e.target.files[0]){
      const selectedFiles = <FileList>e.target.files;
      
      const fileNames = [];
      // console.log(selectedFiles);
      
      // console.log(this.files);
      
      this._publishService.uploadImage(this.publicationID, selectedFiles, index)
      .subscribe(
        (event: HttpEvent<Object>) => {
          
          // console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('Upload Concluído');
            console.log(event.body);
            this.publication = event.body;
            this.getImages();
          } else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total);
            // console.log('Progresso', percentDone);
            this.progress = percentDone;
          }
        }
      )
    }
    
  }
private getImages(){
  let imageLength = this.publication.images.length
  
  this.images = this.publication.images
    for (let index = 0; index <= 15 - imageLength ; index++) {
      this.images.push(
          {
            id: null,
            url : "../../../../assets/images/no-image.svg",  
          }
      )
          
    } 
  
}
 removeImage(index: number){
  const image = this.images[index]
  this._publishService.removeImageId(image.id).subscribe(
    res => {
      
      this.publication.images.splice(index,1);
      this.getImages();
      console.log(res);
      
    }
  )
}
}
