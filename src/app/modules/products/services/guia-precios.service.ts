import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuiaPreciosService {

  constructor(
    private _http: HttpClient
  ) { }



  pricesSearch(criterio){
    return this._http.post<any>(`${environment.API}guia-precios`, criterio).pipe(
      take(1)
    )
  }

}
