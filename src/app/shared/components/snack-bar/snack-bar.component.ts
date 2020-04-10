import { Component, Input, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {
  
    constructor(
      @Inject(MAT_SNACK_BAR_DATA) public data: any,
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
