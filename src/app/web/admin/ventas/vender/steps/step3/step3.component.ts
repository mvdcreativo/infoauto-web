import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublishService } from '../../../services/publish.service';
import { take } from 'rxjs/operators';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { SettingApiService } from 'src/app/web/admin/setting-api/services/setting-api.service';
import { CheckboxItem } from 'src/app/shared/checkbox-group/CheckboxItem';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  formStep3: FormGroup;
  info: any;
  extras: any[];
  publicationID: number;
  progress: number;
  images: any;
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
          this.route.navigate(['mi-cuenta/ventas/vender/step1'])
        }


        this.selectExtras();
      }
    )

    this.generaFormStep3();

  }

  private getPublication() {
    this._publishService.publication.subscribe(
      res => this.publication = res
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
    const nexStep = "mi-cuenta/ventas/vender/step4"
    return this._publishService.updatePublication(data, nexStep)
  }




  selectExtras() {
    this._settingApiServises.getExtras()
      .pipe(
        take(1)
      )
      .subscribe(
        (attr: any) => {
          this.extras = attr
          console.log(attr);

          this.checkboxes = this.extras
            .map(
              x => {
                return new CheckboxItem(x.id, x.name)
              }
            );


          console.log(this.checkboxes);

          // this.addCheckboxesAttributes()
          this.selectValues()

        }
      );
  }


  selectValues() {

    const values = this._publishService.publicationValue;
    if (values) {
      this.publicationExtras = values.extras.map(v => v.id)
      // console.log(this.publicationExtras);

    } else {
      this.publicationExtras = []
    }

    ////Valor Descripción
    if (this.publication) {
      const descriptionText = this.publication.description
      this.formStep3.patchValue({
        description: descriptionText
      })

    }

  }

  attCheck(event, group) {
    console.log(event);
    // 
    this.groupCheckbox = event;

    console.log(this.groupCheckbox);

  }


}
