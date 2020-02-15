import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Product } from '../../../../interfaces/product';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PublishService {

  private publicationSubject$: BehaviorSubject<Product> = new BehaviorSubject<Product>(null);
  public publication: Observable<Product>;

  constructor(
    private _http: HttpClient,
    private route: Router,
    private activateRoute: ActivatedRoute
  ) {

    this.publication = this.publicationSubject$.asObservable();
    console.log(this.publicationValue);
    
  }


  public get publicationValue(): Product {
    return this.publicationSubject$.value;
  }

  ////Recupera Publicación
  getPublicationById(id:number){
    return this._http.get<Product>(`${environment.API}product/${id}`).pipe(
      take(1)
    ).subscribe(
      res =>{
        this.publicationSubject$.next(res)
        console.log(this.publicationValue);
        
      }
    )
  }


  ///guarda primera vez publicación y queda como pendiente hasta el último Step
  addPublication(data) {
    return this._http.post<Product>(`${environment.API}product`, data).pipe(
      take(1)
    ).subscribe(
      res => {
        this.publicationSubject$.next(res)
        console.log(res)
        this.route.navigate(['mi-cuenta/ventas/vender/step2', this.publicationValue.id ])
      },
      error => { console.log(error) }
    )
  }

  ///Actualiza publicación con cada Step que la llama
  updatePublication(data: Product, nexStep: string) {
    const publicationId = this.publicationValue.id

    return this._http.put<Product>(`${environment.API}product/${publicationId}`, data).pipe(
      take(1)
    ).subscribe(
      res => {
        this.publicationSubject$.next(res)
        console.log(res)
        this.route.navigate([nexStep])
      },
      error => { console.log(error) }
    )
  }

  uploadImage(publicationID: number, files: FileList, index?: number) {

    const formData = new FormData();
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append('images[]', files[i])
      // formData.append("_method", "PUT")
    }

    formData.append("_method", "PUT")

    return this._http.post(`${environment.API}product/${publicationID}`, formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  removeImageId(imageID) {
    return this._http.delete(`${environment.API}image/${imageID}`);
  }
  // getPublication(){
  //   return
  // }

}
