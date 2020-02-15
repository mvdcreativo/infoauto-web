import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    public _http : HttpClient
  ) { }


  countries(){
    return this._http.get(`${environment.API}country`);
  }
  
  states(country_id: number){
    return this._http.get(`${environment.API}country/${country_id}`);
  }

  cities(state_id:number){
    return this._http.get(`${environment.API}state/${state_id}`);
  }

  neighborhoods(city_id:number){
    return this._http.get(`${environment.API}city/${city_id}`);
  }

  

}
