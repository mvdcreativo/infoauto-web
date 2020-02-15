import { Component, OnInit, Attribute, OnChanges } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { PublishService } from '../../../services/publish.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product, Attributes } from 'src/app/interfaces/product';
import { take } from 'rxjs/operators';
import { SettingApiService } from 'src/app/web/admin/setting-api/services/setting-api.service';
import { CheckboxItem } from 'src/app/shared/checkbox-group/CheckboxItem';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit, OnChanges {

  formStep2: FormGroup;
  attributes: any;
  attrIterable: any = [];
  publication_id: any;
  subAttr: any;
  attrCheckboxes: any;
  attrCheckboxesChildren: any;
  groupCheckbox: any=[];
  publicationAttributes: any;



  constructor(
    private _settingApiServises: SettingApiService,
    private _publishService: PublishService,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute
    ) { 

  }
  ngOnInit() {
    
    this.activateRoute.params.subscribe(
      (param: Params) => {
        if (param.id) {
          this._publishService.getPublicationById(param.id)
          
        } else {
          this.route.navigate(['mi-cuenta/ventas/vender/step1'])
        }
        // console.log(param.id);
        
      }
    )
      this.selectAttributes();
    

  }

  ngOnChanges(){

  }


  // private generaFormStep2() {


  //   this.formStep2 = this._fb.group({
  //     // attributes: new FormArray([])
  //   });
  //   this.selectAttributes();

  // }

  ////////SUBMIT
  submitStep2() {
    const attributes = this.groupCheckbox.flat()
    console.log(attributes);
    
    const data = {'attributes': attributes}
    

    
    
    this.udatePublication(data);

    // console.log(this.formStep2.value);


    //     const selectedAttr = this.formStep2.value.attributes
    //       .map((v, i) => v ? this.attributes[i].id : null)
    //       .filter(v => v !== null);

    // console.log(selectedAttr);

    //     let data: Product = {attributes: null}
    //     console.log(data);
    //     data.attributes = selectedAttr
    //     this.udatePublication(data);


  }



  udatePublication(data) {
    console.log(data);
    const nexStep = "mi-cuenta/ventas/vender/step3"
    return this._publishService.updatePublication(data, nexStep)
    // .subscribe(
    //   res => {
    //     this.publication = res
    //     this.publicationID = res.id
    //     console.log(this.publicationID);

    //     console.log(this.publication)
    //     this.getImages();
    //   }
    // )
  }

  selectAttributes() {
    this._settingApiServises.getAttributes()
      .pipe(
        take(1)
      )
      .subscribe(
        attr => {
          this.attributes = attr

          this.attrCheckboxes = this.attributes
            .filter(x => !x.attributes.length)
            .map(
              x => {
                return new CheckboxItem(x.id, x.name)
              }
            );

          this.attrCheckboxesChildren = this.attributes
            .filter(x => x.attributes.length)
            .map(
              x => {
                let children = 
                  {
                    title: x.name,
                    attributes: x.attributes.map(x=> new CheckboxItem(x.id, x.name))
                  }
                

                return children;
              }
              
            )
              // console.log(this.attrCheckboxesChildren);
          
          // this.addCheckboxesAttributes()
          this.selectValues()
            console.log();
            
        }
      );
  }

  attCheck(event, group) {
    console.log(event);
// 
    this.groupCheckbox[group] = event;

    console.log(this.groupCheckbox);

  }


  selectValues(){
    
    const values = this._publishService.publicationValue;
    if(values){
      this.publicationAttributes = values.attributes.map(v=> v.id)
      
    }else{
      this.publicationAttributes = []
    }
    
    
  }
}
