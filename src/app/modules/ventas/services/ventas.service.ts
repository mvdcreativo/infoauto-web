import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { User } from '../../users/interfaces/user';
import { Product } from '../../products/interfaces/product';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(
    private _http: HttpClient,
    private _authService : AuthService,
  ) { }


  getPublicationsUser( state ){
    const user : User = this._authService.currentUserValue.user
    const user_id = user['id']
    

    return this._http.get<Product[]>(`${environment.API}search/user/${user_id}`).pipe(
      take(1)
    )
  }





}
