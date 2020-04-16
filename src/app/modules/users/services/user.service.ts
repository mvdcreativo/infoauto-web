import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
    // private _snackBar: MatSnackBar
  ) { }



  ////////PAGINACION, FILTRADO Y ORDEN, ANGULAR MATERIAL

  private totalResultSubject = new BehaviorSubject<number>(null);
  public totalResult$ = this.totalResultSubject.asObservable();

  findUsers(filter = '', sortOrder = 'asc', pageNumber = 1, pageSize = 20): Observable<User[]> {

    return this._http.get(`${environment.AuthAPI}users`, {
      params: new HttpParams()
        .set('page', pageNumber.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageSize', pageSize.toString())

    }).pipe(
      map(
        (res: any) => {
          res["payload"] = res;
          this.totalResultSubject.next(res.total)
          return res["payload"];
        }
      )
    );
  }
  ///////////////////////////////////////////////////////////






  // Users
  getUsers() {
    return this._http.get<User[]>(`${environment.AuthAPI}users`).pipe(
      take(1)
    )
  }
  addUser(data) {
    return this._http.post<User>(`${environment.AuthAPI}users`, data).pipe(
      take(1)
    )
  }

  deleteUser(id) {
    return this._http.delete<User>(`${environment.AuthAPI}users/${id}`).pipe(
      take(1)
    )
  }

  updateUser(id, data) {
    return this._http.put<User>(`${environment.AuthAPI}users/${id}`, data).pipe(
      take(1)
    )
  }



  ////////////////////

}
