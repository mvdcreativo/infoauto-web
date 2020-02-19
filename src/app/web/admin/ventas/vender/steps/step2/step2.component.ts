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
export class Step2Component implements OnInit {

  formStep2: FormGroup;
  attributes: any;
  subAttr: any;
  attrCheckboxes: any;
  attrCheckboxesChildren: any;
  groupCheckbox: any=[];
  publicationAttributes: any;



  constructor(
    private _settingApiServises: SettingApiService,
    private _publishService: PublishService,
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




  ////////SUBMIT
  submitStep2() {
    const attributes = this.groupCheckbox.flat()
    console.log(attributes);
    
    const data = {'attributes': attributes}
    

    
    
    this.udatePublication(data);



  }



  udatePublication(data) {
    console.log(data);
    const nexStep = "mi-cuenta/ventas/vender/step3"
    return this._publishService.updatePublication(data, nexStep)

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
                    attributes: x.attributes.map(x=> new CheckboxItem(x.id, x.name)),
                    multi_option: x.multi_option
                  }
                

                return children;
              }
              
            )
          
          // this.addCheckboxesAttributes()
          this.selectValues()
            console.log();
            
        }
      );
  }

  attCheck(event, group) {
    this.groupCheckbox[group] = event;
  }


  value(valores,i){
    // console.log(this.publicationAttributes);

    const n = valores.map(
                a => { 
                  const ch = this.publicationAttributes.find(b => b === a.value)
                  // console.log(ch);
                  return ch
                  
                }
              )
    const che = n.filter(x=> x !== undefined)
    // this.attCheck(che[0], i)

    return che[0];
      
  }


  selectValues(){
    
    const values = this._publishService.publicationValue;
    if(values){
      this.publicationAttributes = values.attributes.map(v=> v.id)
      console.log(this.publicationAttributes);
      
    }else{
      
      this.publicationAttributes = []
    }
    
    
  }
}
