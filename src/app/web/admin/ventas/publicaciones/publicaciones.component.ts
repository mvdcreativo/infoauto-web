import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { VentasService } from '../services/ventas.service';
import { Product } from 'src/app/interfaces/product';
import { Result, DataResult } from 'src/app/interfaces/resultado';

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
  displayedColumns: string[] = ['id', 'name_concat', 'year', 'state', 'price' ];
  publications: Product[];
  dataSource: any;


  constructor(
    private _ventasService: VentasService
  ) { }

  ngOnInit() {

    this._ventasService.getPublicationsUser(0).subscribe(
      res => {
        this.publications = res.reverse();
        this.dataSource = new MatTableDataSource(this.publications);
      }
    );

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
