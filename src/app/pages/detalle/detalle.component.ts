import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';
import { SearchService } from 'src/app/modules/products/services/search.service';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  galleryItems: GalleryItem[];
  images: ImageItem[];
  caracteristicas: any[];


  
  constructor(
    private rutaActiva : ActivatedRoute,
    private _searchService : SearchService
  ) { }

    vehiculo : any = null;
    title:string 
    panelOpenState = true;
    multi = true


  ngOnInit() {
    this.getParams()
    
  }


  getParams() {
    this.rutaActiva.paramMap.subscribe(
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
        this.images = this.vehiculo.images.map(v => new ImageItem({src: v.url, thumb: v.url}));


        const attrPadre = this.vehiculo.attributes
        .map(v => {
            return {id: v.attribute.id, name: v.attribute.name, attributes: []}
        })

        

        
        this.caracteristicas= this.eliminarObjetosDuplicados(attrPadre, 'id');
        ///crea array para mostrar caracteristicas   
        this.caracteristicas.forEach(element => {

          this.vehiculo.attributes.forEach(item => {
            if(item.attribute_id === element.id){
              element.attributes.push({id:item.id, name:item.name})
            }
          });

        });
        
        
      }
    )
  }

  eliminarObjetosDuplicados(arr, prop) {
    var nuevoArray = [];
    var lookup = {};

    for (var i in arr) {
      lookup[arr[i][prop]] = arr[i];

    }

    for (i in lookup) {
      nuevoArray.push(lookup[i]);
    }
    // console.log(lookup[i]);


    return nuevoArray;
  }
}
