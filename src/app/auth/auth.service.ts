import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap, take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { CurrentUser, User } from '../modules/users/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<CurrentUser>;
  public currentUser: Observable<CurrentUser>;
  public errorSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  public error$: Observable<any>;


  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.error$ = this.errorSubject.asObservable();

   }

   public get errorValue(): any {
    return this.errorSubject.value;
  }

  public get currentUserValue(): CurrentUser {
    return this.currentUserSubject.value;
  }


  findUser(id) {
    return this.http.get<User>(`${environment.API}user/${id}`)
  }


  register(credentials: User): Observable<User> {
    return this.http.post<User>(`${environment.API}auth/signup`, credentials)
      .pipe(
        map(user => {
            console.log(user);

            this.router.navigate(['login']);
            // console.log(user);



            return user;
        }),
      );
  }



  login(credentials: User): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(`${environment.API}auth/login`, credentials)
    .pipe(
      map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details ands token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              // this.router.navigate(['admin'])
              // console.log(user);

          }

          return user;
      }),
    );
  }

  logout() {
    console.log('logoutService');

    return this.http.get<any>(`${environment.API}auth/logout`)
    .pipe(
      map( res => {
        console.log(res);
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['login']);
      }),
    );

  }

}
