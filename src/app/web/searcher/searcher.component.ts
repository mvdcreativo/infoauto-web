import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { take } from 'rxjs/operators';
import { SearchFilters } from '../../interfaces/search-filters';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearcherComponent implements OnInit {

  categories: any = [];
  brands: any = [];
  models: any = [];
  precios: any = [];
  anos: any = [];
  categoryId: number = 1;
  brandId: number;
  criterios: SearchFilters;
  arrParametros: any = [];
  formSearch : FormGroup;

  paramsSerch: any;
  urlResult: any;



  constructor(
    private _searchService: SearchService,
    private fb: FormBuilder,
    private route: Router
  ) { }

  ngOnInit() {
  this.createForm()    
    this.selectCategory();
    this.selectBrand(this.categoryId);
    this.selectPrecios();
    this.selectAnos();
  }

createForm(){
  this.formSearch = this.fb.group({
    category: [1, Validators.required],
    brand: [''],
    model: [''],
    pricemin: [''],
    pricemax: [''],
    yearmin: [''],
    yearmax: [''],

  });
}

  onSubmit() {

    this.criterios = this.formSearch.value

    if (this.criterios.category) {
      this.idToSlug('category', this.categories)
    }
    if (this.criterios.brand) {
      this.idToSlug('brand', this.brands)
    }
    if (this.criterios.model) {
      this.idToSlug('model', this.models)
    }
    // this.idToSlug('category', this.categories)
    // this.idToSlug('brand', this.brands)
    // this.idToSlug('model', this.models)

    this.cleanObjet(this.criterios)
    // console.log(this.criterios);

    this._searchService.criterios$.next(this.criterios)
    this.route.navigate(['/listado'], { queryParams: this.criterios })
    // if(this.criterios.brand =='' || this.criterios.brand == undefined  ){
    //   var urlBrand = 'todas-las-marcas'
    // }else{ 
    //   var brand = this.brands.filter(brand => brand.id == this.criterios.brand)
    //    urlBrand= `${brand[0].slug}`
    //  }


    // if(this.criterios.model !=''){
    //   var model = this.models.filter(model => model.id == this.criterios.model)
    //   var urlModel= `${model[0].slug}`
    // }else{  urlModel = 'todos-los-modelos'}
  }

  idToSlug(campo:string, arrCampo:any) {
    
      let campoSlug = arrCampo.filter(item => item.id == this.criterios[campo])
      this.criterios[campo] = `${campoSlug[0].slug}`
    
  }

  cleanObjet(obj: any) {
    for (var propName in obj) {
      if (obj[propName] === "" || obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

  changeCategory(e) {
    this.categoryId = e.value;
    this.selectBrand(this.categoryId);
    // console.log(this.categoryId);
  }
  changeBrand(e) {
    if (e.value === undefined) {
      this.models = [];
      console.log(this.formSearch.value);

      this.formSearch.patchValue({
        model: ''
      })
    } else {
      this.brandId = e.value;
      this.formSearch.patchValue({
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

}
