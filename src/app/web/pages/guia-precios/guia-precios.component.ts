import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchFilters } from 'src/app/interfaces/search-filters';
import { take } from 'rxjs/operators';

@Component({
  selector: 'guia-precios',
  templateUrl: './guia-precios.component.html',
  styleUrls: ['./guia-precios.component.scss']
})
export class GuiaPreciosComponent implements OnInit {
  categories: any = [];
  brands: any = [];
  models: any = [];
  precios: any = [];
  anos: any = [];
  categoryId: number = 1;
  brandId: number;
  criterios: SearchFilters;
  arrParametros: any = [];


  paramsSerch: any;
  urlResult: any;

  formSearch: any = this.fb.group({
    category: [1, Validators.required],
    brand: [''],
    model: [''],
    year: [''],
    kms: ['']

  });

  constructor(
    private _searchService: SearchService,
    private fb: FormBuilder,
    private route: Router
  ) { }

  ngOnInit() {
    this.selectCategory();
    this.selectBrand(this.categoryId);
    this.selectPrecios();
    this.selectAnos();
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
     this.cleanObjet(this.criterios)
      console.log(this.criterios);


    // this._searchService.criterios$.next(this.criterios)
    this.route.navigate(['/guia-de-precios/estadistica'], { queryParams: this.criterios })

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
