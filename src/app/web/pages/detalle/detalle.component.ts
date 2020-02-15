import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {


  
  constructor(
    private rutaActiva : ActivatedRoute,
    private _searchService : SearchService
  ) { }

    vehiculo : any;
    title:string 
    panelOpenState = true;
    multi = true


  ngOnInit() {
    this.getParams()
    
  }


  getParams() {
    this.rutaActiva.paramMap.pipe(
      take(1))
      .subscribe(
      (params : Params) => {
        if (params.params.id) {
          let id= params.params.id
          this.getVehiculo(id)

          
        }

      }
      
    )
  }

  getVehiculo(id:number){
    this._searchService.getVehiculoId(id).subscribe(
      res => {
        this.vehiculo = res
        this.title = `${this.vehiculo.brand.name} ${this.vehiculo.vehicle_model.name} año ${this.vehiculo.year}`
        console.log(this.vehiculo);
      }
    )
  }
}
