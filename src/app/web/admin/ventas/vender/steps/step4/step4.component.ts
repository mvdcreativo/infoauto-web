import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PublishService } from '../../../services/publish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingApiService } from 'src/app/web/admin/setting-api/services/setting-api.service';
import { Product } from 'src/app/interfaces/product';
import { take } from 'rxjs/operators';
import { CheckboxItem } from 'src/app/shared/checkbox-group/CheckboxItem';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component implements OnInit {
  formStep3: FormGroup;
  extras: any[];
  publicationID: number;
  extraIterable: any;
  publication: Product;
  checkboxes: any;
  publicationExtras: number[];
  groupCheckbox: any;

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


        this.selectExtras();
      }
    )

  }


  
  private generaFormStep3() {
    this.formStep3 = this._fb.group({
      description: [null, Validators.maxLength(1000)]
    });


  }

  submitStep3() {
    const extras = this.groupCheckbox.flat()
    console.log(extras);
    const description = this.formStep3.controls.description.value
    const data = {
      'description': description,
      'extras': extras,
    }
    this.udatePublication(data);

  }



  udatePublication(data) {
    console.log(data);
    const nexStep = "/vender/step5"
    return this._publishService.updatePublication(data, nexStep)
  }


  private getPublication() {
    this._publishService.publication.subscribe(
      res => {
        this.publication = res
        this.selectValues()
      }
    )

  }
  
  
  selectExtras() {
    this._settingApiServises.getExtras()
      .pipe(
        take(1)
      )
      .subscribe(
        (attr: any) => {
          
          console.log(attr);
          
          this.checkboxes = attr
          .map(
            x => {
              return new CheckboxItem(x.id, x.name)
            }
            );
            
            if(this.checkboxes){
              
            }
          console.log(this.checkboxes);

          // this.addCheckboxesAttributes()

        }
      );
  }

  selectValues() {

    this._publishService.publication.pipe(take(1)).subscribe(
      res => {
        console.log(res);
        
        if (res) {
          this.publicationExtras = res.extras.map(v => v.id)
          console.log(this.publicationExtras);
          
        } else {
          this.publicationExtras = []
        }
        this.generaFormStep3();


      }

    )

    ////Valor Descripción
    if (this.publication) {
      const descriptionText = this.publication.description
      this.formStep3.patchValue({
        description: descriptionText
      })

    }

  }

  attCheck(event, group) {
    // console.log(event);
    // 
    this.groupCheckbox = event;

    // console.log(this.groupCheckbox);

  }



  back(){
    const urlBack = `/vender/step3/${this.publication.id}`
    this.route.navigate([urlBack]);
  }

}
