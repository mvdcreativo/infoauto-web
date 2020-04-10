import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }




    ////////////////////
    openSnackBar(estadoRes, message: string) {
      let classToast: string;
      switch (estadoRes) {
        case "success":
          classToast = "toastSuccess"
          break;
        case "warn":
          classToast = "toastWarn"
          break;
        case "error":
          classToast = "toastError"
          break;
  
        default:
          classToast = "toastError"
          break;
      }
  
      const durationSeconds = 5;
      this._snackBar.openFromComponent(SnackBarComponent, {
        data: message,
        panelClass: [classToast],
        verticalPosition: 'top',
        duration: durationSeconds * 1000,
      });
    }
}
