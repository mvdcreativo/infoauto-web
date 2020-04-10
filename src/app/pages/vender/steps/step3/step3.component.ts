import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/modules/products/interfaces/product';
import { PublishService } from 'src/app/modules/ventas/services/publish.service';
import { SettingApiService } from 'src/app/modules/services/setting-api.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  formStep3: FormGroup;
  extras: any[];
  publicationID: number;
  progress: number;
  images: any;
  publication: Product;
  btnDisabled: boolean = false;


  constructor(
    private _fb: FormBuilder,
    private _publishService: PublishService,
    private _settingApiServises: SettingApiService,
    private route: Router,
    private activateRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      (param: Params) => {
        if (param.id) {
          this._publishService.getPublicationById(param.id).pipe(take(1)).subscribe(
            res => this.getPublication()
          )
        } else {
          this.route.navigate(['/vender/step1'])
        }

      }
    )


    
  }

  onSubmit(){
    if(this.publication.images.length >= 1){
      this.btnDisabled = true;
      this.route.navigate([`/vender/step4/${this.publication.id}`])
    }
  }

  private getPublication() {
    this._publishService.publication.subscribe(
      res => {
        this.publication = res
      }
    )

  }

  back(){
    const urlBack = `/vender/step2/${this.publication.id}`
    this.route.navigate([urlBack]);
  }


}
