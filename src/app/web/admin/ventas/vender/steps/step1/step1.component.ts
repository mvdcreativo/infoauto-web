import { Component, OnInit } from '@angular/core';
import { PublishService } from 'src/app/web/admin/ventas/services/publish.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { VehicleCategory, Brand, VehicleModel, VehicleSubModel, NameConcat } from 'src/app/interfaces/resultado';
import { Product } from 'src/app/interfaces/product';
import { SettingApiService } from 'src/app/web/admin/setting-api/services/setting-api.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  formStep1: FormGroup;
  data: any;
  categories: VehicleCategory[];
  brands: Brand[];
  models: VehicleModel[];
  subModels: VehicleSubModel[];
  nameConcat: NameConcat = {brand_id: null,vehicle_model_id: null,vehicle_sub_model_id: null};
  categoryId: number;
  brandId: number;
  conditions: any;
  precios: any = [];
  anos: any[];
  currencies: any;
  priceCondition: any;
  priceConditions: any;
  publication: Product;
  update: boolean = false;

  constructor(
    private _settingApiServises: SettingApiService,
    private _publishService: PublishService,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private route: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      (param: Params) => {
        if (param.id) {
          this._publishService.getPublicationById(param.id)
          this.getPublication();

        } else {
          this.route.navigate(['/vender/step1'])
        }
        // console.log(param.id);
        
      }
    )
    this.generaFormStep1()
  }

  private getPublication() {


    this._publishService.publication.subscribe(
      res =>{ 
        this.publication = res

        if(this.formStep1){
          this.selectModel(this.publication.brand_id);
          this.selectSubModel(this.publication.vehicle_model_id);

          this.formStep1.setValue({
            user_id: this.publication.user_id,
            vehicle_category_id: this.publication.vehicle_category_id,
            brand_id: this.publication.brand_id,
            vehicle_model_id: this.publication.vehicle_model_id,
            vehicle_sub_model_id: this.publication.vehicle_sub_model_id,
            year: this.publication.year,
            price: this.publication.price,
            condition_id: this.publication.condition_id,
            km: this.publication.km,
            state: this.publication.state,
            currency_id: this.publication.currency_id,
            city_id: this.publication.city_id,
            neighborhood_id: this.publication.neighborhood_id,
            price_condition_id: this.publication.price_condition_id,
          });

        }
        this.update = true;

      }
    )
  }


  private generaFormStep1() {
    const user: User = this._authService.currentUserValue.user

    this.formStep1 = this._fb.group({
      user_id: user.id,
      vehicle_category_id: [1, Validators.required],
      brand_id: [null, Validators.required],
      vehicle_model_id: [null, Validators.required],
      vehicle_sub_model_id: [null],
      year: [null, Validators.required],
      price: [0, Validators.required],
      condition_id: [null, Validators.required],
      km: [0],
      state: ['PEN'],
      currency_id: [2, Validators.required],
      city_id: [user.city_id],
      neighborhood_id: [user.neighborhood_id],
      price_condition_id: [null],
    });

    this.selectCategory()
    this.selectBrand()
    this.selectAnos()
    this.selectCondition()
    this.selectPrecios()
    this.selectCurrency()
    this.selectPriceCondition()
  }


  submitStep1() {


    this.data = this.formStep1.value
    console.log(this.data);

    // if (this.data.vehicle_category_id) {
    //   this.idToSlug('vehicle_category_id', this.categories)
    // }
    if (this.data.brand_id) {
      this.idToSlug('brand_id', this.brands , this.data)
    }
    if (this.data.vehicle_model_id) {
      this.idToSlug('vehicle_model_id', this.models , this.data)
    }
    if (this.data.vehicle_sub_model_id) {
      this.idToSlug('vehicle_sub_model_id', this.subModels, this.data)
    }
    // this.cleanObjet(this.data)
    console.log(this.nameConcat);

    this.data.name_concat = `${this.nameConcat.brand_id} ${this.nameConcat.vehicle_model_id} ${this.nameConcat.vehicle_sub_model_id}`;

    console.log(this.data);


////actualiza o agrega
    if(this.update){
      const nexStep = "/vender/step2"

      return this._publishService.updatePublication(this.data, nexStep)

    }else{
      return this._publishService.addPublication(this.data)

    }


  }



  idToSlug(campo: string, arrCampo: any, data) {

    let campoSlug = arrCampo.filter(item => item.id == data[campo])
    this.nameConcat[campo] = `${campoSlug[0].name}`

  }

  changeCategory(e) {
    this.categoryId = e;
    this.selectBrand();
    // console.log(this.categoryId);
  }
  changeBrand(e) {
    if (e === undefined) {
      this.models = [];
      console.log(this.formStep1.value);

      this.formStep1.patchValue({
        vehicle_model_id: ''
      })
    } else {
      this.brandId = e;
      this.formStep1.patchValue({
        vehicle_model_id: ''
      })
      this.selectModel(this.brandId);
      // console.log(this.brandId);
    }
  }
  changeModel(e) {
    let modelId;
    if (e === undefined) {
      this.subModels = [];
      console.log(this.formStep1.value);

      this.formStep1.patchValue({
        vehicle_sub_model_id: ''
      })
    } else {
      modelId = e;
      this.formStep1.patchValue({
        vehicle_sub_model_id: ''
      })
      this.selectSubModel(modelId);
      // console.log(this.brandId);
    }
  }

  selectCategory() {
    return this._settingApiServises.getCategory()
      .subscribe(
        (category: any) => {
          
          this.categories = category
          // console.log(this.categories);
        }
      )
  }

  selectBrand() {
    return this._settingApiServises.getBrands()
    .subscribe(
      (res:any)=>{
        this.brands = res

      }
    )

  }

  selectModel(brandId: number) {
    return this._settingApiServises.getModelsByIDBrand(brandId)
      .subscribe(
        (res: any) => {
          this.models = res.vehicle_models
          // console.log(this.models)        
        }
      );
  }
  selectSubModel(modelId){
    return this._settingApiServises.getSubModelByModelId(modelId)
    .subscribe(
      (res: any) => {
        this.subModels = res.veicle_sub_models
        // console.log(this.models)        
      }
    );
  }

  selectCondition() {
    this.conditions = this._settingApiServises.getCondition()
  }

  onConditionChanged({value}){
    if (value === 2) {
      this.formStep1.get('km').enable()
      this.formStep1.controls['km'].setValidators(Validators.required)

    } else {
      this.formStep1.get('km').disable()
    }
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
  selectCurrency() {
    this.currencies = this._settingApiServises.getCurrencies()
  }
  selectPriceCondition() {
    this.priceConditions = this._settingApiServises.getPriceConditions()
  }
}
