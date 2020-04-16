import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { Product } from '../interfaces/product';
import { Comparador } from '../interfaces/comparador';
import { MatSnackBar } from '@angular/material/snack-bar';


// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("compareItems")) || [];

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  private comparadorSubject$ : BehaviorSubject<Product[]>= new BehaviorSubject([]);;
  public comparador$: Subscriber<{}>;

  constructor(
    // private snackBar: MatSnackBar
    ) {
    this.comparadorSubject$.subscribe(
      products => products = products
    );
    
   }
    // 
    // Get Products
    public getItems(): Observable<Comparador[]> {
      const itemsStream = new Observable(observer => {
        observer.next(products);
        observer.complete();
      });
      return <Observable<Comparador[]>>itemsStream;
    }

  addToCompare(product){
    let message, status;
    var item: Comparador | boolean = false;
    
    
    // If Products exist
    let hasItem = products.find((items, index) => {
      if(items.product.id == product.id) {
          message = 'El vehículo ya esta en el comparador';
          status = 'success';
          // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
          return true
      }

      return false;
    })



    // If Products does not exist (Add New Products)
    if(!hasItem) {
      if(products.length >=3) {
        message = 'Ya se a colocado el máximo de vehiculos para comparar';
        status = 'success';
        // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
        
      }else{
        console.log(product);
        item = { product: product };
        products.push(item);
        message = 'El vehículo ' + product.name_concat + ' esta listo para comparar';
        status = 'success';
        // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });

      }
    }

    localStorage.setItem("compareItems", JSON.stringify(products));
    return item;
  }
}
