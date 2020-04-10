import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Brand, VehicleCategory, VehicleModel, VehicleSubModel } from '../products/interfaces/resultado';
import { Attributes, Extras } from '../products/interfaces/product';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SettingApiService {

  constructor(
    private _http: HttpClient,
    // private _snackBar: MatSnackBar

  ) {

  }

  //categoias
  getCategory() {
    return this._http.get<VehicleCategory>(`${environment.API}category`).pipe(
      take(1)
    )
  }
  addCategory(data) {
    return this._http.post<VehicleCategory>(`${environment.API}category`, data).pipe(
      take(1)
    )
  }

  deleteCategory(id) {
    return this._http.delete<VehicleCategory>(`${environment.API}category/${id}`).pipe(
      take(1)
    )
  }

  updateCategory(id, data){
    return this._http.put<VehicleCategory>(`${environment.API}category/${id}`, data).pipe(
      take(1)
    )
  }
  ////

  ///Brands
  getBrands() {
    return this._http.get<Brand[]>(`${environment.API}brand`).pipe(
      take(1)
    )
  }

  addBrand(data) {
    return this._http.post<Brand>(`${environment.API}brand`, data).pipe(
      take(1)
    )
  }

  deleteBrand(id) {
    return this._http.delete<Brand>(`${environment.API}brand/${id}`).pipe(
      take(1)
    )
  }
  updateBrand(id, data){
    return this._http.post<Brand>(`${environment.API}brand/${id}`, data).pipe(
      take(1)
    )
  }
  /////

  //////Models
  getModels() {
    return this._http.get<VehicleModel>(`${environment.API}vehicle-model-all`)
  }

  getModelsByIDBrand(brand_id: number) {
    return this._http.get<VehicleModel>(`${environment.API}brand/${brand_id}`)
  }

  addModel(data) {
    return this._http.post<VehicleModel>(`${environment.API}vehicle-model`, data).pipe(
      take(1)
    )
  }

  deleteModel(id) {
    return this._http.delete<VehicleModel>(`${environment.API}vehicle-model/${id}`).pipe(
      take(1)
    )
  }

  updateModel(id, data){
    return this._http.put<VehicleModel>(`${environment.API}vehicle-model/${id}`, data).pipe(
      take(1)
    )
  }

  ///// Sub Modelos
  getSubModel() {
    return this._http.get<VehicleSubModel>(`${environment.API}vehicle-sub-model`)
  }
  getSubModelByModelId(model_id){
    return this._http.get<VehicleModel>(`${environment.API}vehicle-model/${model_id}`)

  }

  addSubModel(data) {
    return this._http.post<VehicleSubModel>(`${environment.API}vehicle-sub-model`, data).pipe(
      take(1)
    )
  }
  deleteSubModel(id) {
    return this._http.delete<VehicleSubModel>(`${environment.API}vehicle-sub-model/${id}`).pipe(
      take(1)
    )
  }

  updateSubModel(id, data){
    return this._http.put<VehicleSubModel>(`${environment.API}vehicle-sub-model/${id}`, data).pipe(
      take(1)
    )
  }
//////


/////Attributes

getAttributes() {
  return this._http.get<Attributes>(`${environment.API}attributes`)
}

addAttribute(data) {
  return this._http.post<Attributes>(`${environment.API}attributes`, data).pipe(
    take(1)
  )
}
deleteAttribute(id) {
  return this._http.delete<Attributes>(`${environment.API}attributes/${id}`).pipe(
    take(1)
  )
}

updateAttributes(id, data){
  return this._http.post<Attributes>(`${environment.API}attributes/${id}`, data).pipe(
    take(1)
  )
}
////////

/////Extras

getExtras() {
  return this._http.get<Extras>(`${environment.API}extras`)
}

addExtra(data) {
  return this._http.post<Extras>(`${environment.API}extras`, data).pipe(
    take(1)
  )
}
deleteExtra(id) {
  return this._http.delete<Extras>(`${environment.API}extras/${id}`).pipe(
    take(1)
  )
}


////////

/////Conditions
getCondition(){
  return this._http.get<any>(`${environment.API}conditions`)

}

////////////////////

/////Currencies
getCurrencies(){
  return this._http.get<any>(`${environment.API}currency`)

}

////////////////////

/////PriceCondition
getPriceConditions(){
  return this._http.get<any>(`${environment.API}price-conditions`)

}

////////////////////
  // openSnackBar(estadoRes, message: string) {
  //   let classToast: string;
  //   switch (estadoRes) {
  //     case "success":
  //       classToast = "toastSuccess"
  //       break;
  //     case "warn":
  //       classToast = "toastWarn"
  //       break;
  //     case "error":
  //       classToast = "toastError"
  //       break;

  //     default:
  //       classToast = "toastError"
  //       break;
  //   }

  //   const durationSeconds = 5;
  //   this._snackBar.openFromComponent(SnackBarComponent, {
  //     data: message,
  //     panelClass: [classToast],
  //     verticalPosition: 'top',
  //     duration: durationSeconds * 1000,
  //   });
  // }
}
