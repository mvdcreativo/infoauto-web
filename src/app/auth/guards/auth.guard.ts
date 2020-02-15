import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean  {

      const currentUser = this.authService.currentUserValue;
      ///si es loged
      if (currentUser) {
        console.log('Logged');
        
         return true;
      }
      ///no logeado
      console.error('No logeado');
      
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
      
  }
  
}
