import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { take } from 'rxjs/operators';
import { PublishService } from 'src/app/web/admin/ventas/services/publish.service';
import { Product, Images } from 'src/app/interfaces/product';
import { Image } from 'src/app/interfaces/resultado';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
export class VenderComponent implements OnInit {
  isLinear = false;
  formStep1: FormGroup;
  formStep2: FormGroup;
  formStep3: FormGroup;

  categories: any = [];
  brands: any = [];
  models: any = [];
  precios: any = [];
  anos: any = [];
  categoryId: number = 1;
  brandId: number;
  arrParametros: any = [];
  files: Set<File>;
  
  paramsSerch: any;
  urlResult: any;
  nameConcat: any = [];
  attributes: any = [];
  extras: any = [];
  info: Product;
  masInfo: Product;
  images: Images[] =[];
  publication: any ;
  publicationID: number;
  progress: number = 0;
  conditions: any;
  attrIterable: any;
  extraIterable: any;


  constructor(
    private _searchService: SearchService,
    private _publishService: PublishService,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private route: Router  
    ) { }


  ngOnInit() {
    this.selectCategory();
    this.selectBrand(this.categoryId);
    this.selectPrecios();
    this.selectAnos();
    this.selectAttributes();   
    this.selectExtras(); 
    this.selectCondition();  
    
    this.generaFormStep2();
    this.generaFormStep3();
    
    
    
  }


  
  private generaFormStep2(){
    this.formStep2 = this._fb.group({
      attributes: new FormArray([])
    });
  }
  private generaFormStep3(){
    this.formStep3 = this._fb.group({
      extras : new FormArray([]),
      description : ['', Validators.required]
    });
  }


  private addCheckboxesAttributes() {
    this.attributes.forEach((o, i) => {
      const control = new FormControl(); 
      (this.formStep2.controls.attributes as FormArray).push(control);
      
    });

   this.attrIterable = this.formStep2.controls.attributes.value;
  }

  private addCheckboxesExtras() {
    this.extras.forEach((o, i) => {
      const control = new FormControl(); 
      (this.formStep3.controls.extras as FormArray).push(control);
      
    });

    this.extraIterable = this.formStep3.controls.extras.value;
  }



  submitStep2(){
    

    const selectedAttr = this.formStep2.value.attributes
    .map((v, i) => v ? this.attributes[i].id : null)
    .filter(v => v !== null);
   
    this.info.attributes = selectedAttr;
    console.log(this.info);
    // this.udatePublication();
    

  }

  



  idToSlug(campo:string, arrCampo:any) {
    
    let campoSlug = arrCampo.filter(item => item.id == this.info[campo])
    this.nameConcat[campo] = `${campoSlug[0].name}`
  
  }

// cleanObjet(obj: any) {
//   for (var propName in obj) {
//     if (obj[propName] === "" || obj[propName] === null || obj[propName] === undefined) {
//       delete obj[propName];
//     }
//   }
// }


changeCategory(e) {
  this.categoryId = e.value;
  this.selectBrand(this.categoryId);
  // console.log(this.categoryId);
}
changeBrand(e) {
  if (e.value === undefined) {
    this.models = [];
    console.log(this.formStep1.value);

    this.formStep1.patchValue({
      model: ''
    })
  } else {
    this.brandId = e.value;
    this.formStep1.patchValue({
      model: ''
    })
    this.selectModel(this.brandId);
    // console.log(this.brandId);
  }
}

selectCategory() {
  return this._searchService.getCategory().pipe(
    take(1)).
    subscribe(
      (category: any) => {
        this.categories = category
      }
    )
}

selectBrand(category: number) {
  return this._searchService.getBrands(category).pipe(
    take(1)).
    subscribe(
      (brands: any) => {
        this.brands = brands.brands
        // console.log(brands.brands)
      }
    );
}

selectModel(brandId: number) {
  return this._searchService.getModel(brandId).pipe(
    take(1)).
    subscribe(
      (models: any) => {
        this.models = models.vehicle_models
        // console.log(this.models)        
      }
    );
}

selectCondition(){
  this._searchService.getCondition().pipe(
    take(1)).
    subscribe(
      (condition)=>{
        this.conditions = condition
        console.log(condition);
        
      }
    )
}
selectPrecios() {
  let value = 0
  let arrprecios = Array(35);
  for (let i = 0; i < arrprecios.length; i++) {
    value = value + 100000;
    this.precios.push({ 'value': value, 'option': value });
  }
  // let json= JSON.stringify(this.precios)
  // console.log(this.precios);
}

selectAnos() {
  let anos = [];
  let anoAct = new Date().getFullYear();
  for (let i = 1930; i <= anoAct; i++) {

    anos.push({ 'value': i, 'option': i });
  }
  this.anos = anos.reverse();
  // console.log(this.anos);
}

selectAttributes(){
  this._searchService.getAttributes()
  .pipe(
    take(1)
  )
  .subscribe(
    attr => {
      this.attributes = attr
      this.addCheckboxesAttributes()
    }
  );
}

selectExtras(){
  this._searchService.getExtras()
  .pipe(
    take(1)
  )
  .subscribe(
    ext => {
      this.extras = ext
      this.addCheckboxesExtras()
    }
  );
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



}
