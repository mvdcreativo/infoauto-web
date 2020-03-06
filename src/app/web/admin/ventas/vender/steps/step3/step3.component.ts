import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublishService } from '../../../services/publish.service';
import { take } from 'rxjs/operators';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { SettingApiService } from 'src/app/web/admin/setting-api/services/setting-api.service';

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
          this._publishService.getPublicationById(param.id)
          this.getPublication()
         

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
