import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { VentasService } from '../services/ventas.service';
import { Product } from '../../products/interfaces/product';
import { SettingApiService } from '../../services/setting-api.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/components/snack-bar/services/snack-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { PublishService } from '../services/publish.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name_concat', 'year', 'state', 'price', 'acciones' ];
  publications: Product[];
  dataSource: any;


  constructor(
    private _ventasService: VentasService,
    private _publishService: PublishService,
    private route: Router,
    private _snackBar: MatSnackBar

    ) { }

  ngOnInit() {

    this.getPublication()

  }

  editRegistro(id){
    this.route.navigate(['/vender/step1' , id])
  }

  getPublication(){
    this._ventasService.getPublicationsUser(0).subscribe(
      res => {
        this.publications = res.reverse();
        this.dataSource = new MatTableDataSource(this.publications);
      }
    );
  }

  deleteReg(id:number){
    this._publishService.deletePublication(id).subscribe(
      res => {
        this.openSnackBar('success', `Publicación "${res.name_concat}" eliminada con éxito!!`)
        this.getPublication()
      },
      err =>{
        this.openSnackBar('error', err)

      }
    )
  }

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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
