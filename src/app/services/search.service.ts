import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { SearchFilters, ParamsUrl } from '../interfaces/search-filters';
import { BehaviorSubject, Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Result } from '../interfaces/resultado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  criterios$: BehaviorSubject<SearchFilters> = new BehaviorSubject<SearchFilters>(null);
  resultados$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  // criteriosUrl$: BehaviorSubject<ParamsUrl> = new BehaviorSubject<ParamsUrl>(null);

  constructor(
    private _http: HttpClient
  ) { }


  getVehiculoId(id:number) {
    return this._http.get<any>(`${environment.API}product/${id}`).pipe(
      take(1)
    )
  }

  public search(criterio: SearchFilters) {
    // this.criterios$.next(criterio)
    return this._http.post<Result>(`${environment.API}search`, criterio).pipe(
      take(1)
    )

  }

  getCriterios$(): Observable<SearchFilters> {
    return this.criterios$.asObservable();
  }


  getResultados$(): Observable<any[]> {
    return this.resultados$.asObservable();
  }

  // getCriteriosUrl(): Observable<ParamsUrl> {
  //   return this.criteriosUrl$.asObservable()
  // }


  public getAttributes() {
    return this._http.get<any>(`${environment.API}attributes`)
  }
  public getExtras() {
    return this._http.get<any>(`${environment.API}extras`)
  }

  public getCondition() {
    return this._http.get<any>(`${environment.API}conditions`)
  }

  public getCategory() {
    return this._http.get(`${environment.API}category`);
  }

  public getBrands(category_id: number) {
    return this._http.get(`${environment.API}category/${category_id}`);
  }

  public getModel(brand_id: number) {
    return this._http.get(`${environment.API}brand/${brand_id}`);
  }

  getAllModels(){
    return this._http.get(`${environment.API}vehicle-model`).pipe(
      map(
        (res:any)=> {
          return res.data
        }
      )
    );
  }
  getAllBrands(limit?:any){
    if(!limit){
      limit = 0
    }
    return this._http.get(`${environment.API}brand/custom/limit/${limit}`).pipe(
      take(1))
      
  }

}
