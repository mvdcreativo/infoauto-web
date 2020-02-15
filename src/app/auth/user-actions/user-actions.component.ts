import { Component, OnInit, Input } from '@angular/core';
// import {MatDialog} from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { User, CurrentUser } from 'src/app/interfaces/user';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatMenuTrigger } from '@angular/material/menu';
// import { ModalAuthComponent } from '../modal-auth/modal-auth.component';

@Component({
  selector: 'user-actions-component',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {

  @Input('color') color: string = "#424242";
  currentUser: User;
  returnUrl: Params;
  menuTrigger: MatMenuTrigger;
  
  
  constructor(
    private _authService : AuthService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    // public dialog: MatDialog
  ) { }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(ModalAuthComponent, {
  //     width: '40%',
  //     // data: {name: this.name, animal: this.animal}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }


  ngOnInit() {
    this.rutaActiva.url.subscribe(
      data =>{
        this.returnUrl = data
      }
    )
    this._authService.currentUser.subscribe(
      (data:any) => {
        if(data) {
          this.currentUser = data.user
        }else{
          this.currentUser = null
        }
      }
    );
    console.log(this.currentUser);
    
  }

  public login(){
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.returnUrl } })
  }
  public logout(){
    console.log("logout");
    
    return this._authService.logout().subscribe(
      res => console.log(res)
      
    );
  }

  linkAccound(){
    this.menuTrigger.closeMenu()
    this.router.navigate(['/mi-cuenta']);

  }

}
