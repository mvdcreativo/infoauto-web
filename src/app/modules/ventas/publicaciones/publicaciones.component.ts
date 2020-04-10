import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { VentasService } from '../services/ventas.service';
import { Product } from '../../products/interfaces/product';
import { SettingApiService } from '../../services/setting-api.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/components/snack-bar/services/snack-bar.service';

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
    private _settingsService: SettingApiService,
    private route: Router,
    private _snackBarService: SnackBarService
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
    this._settingsService.deleteBrand(id).subscribe(
      res => {
        this._snackBarService.openSnackBar('success', `Tipo "${res.name}" eliminado con éxito!!`)
        this.getPublication()
      },
      err =>{
        this._snackBarService.openSnackBar('success', err)

      }
    )
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
