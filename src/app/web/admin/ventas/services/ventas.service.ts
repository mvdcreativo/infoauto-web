import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { Result } from 'src/app/interfaces/resultado';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(
    private _http: HttpClient,
    private _authService : AuthService
  ) { }


  getPublicationsUser( state ){
    const user : User = this._authService.currentUserValue.user
    const user_id = user['id']
    

    return this._http.get<Product[]>(`${environment.API}search/user/${user_id}`).pipe(
      take(1)
    )
  }

}
