import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchFilters } from 'src/app/interfaces/search-filters';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  // criterios$: Observable<SearchFilters>[];
  criterios : any
  parametrosUrl: any;
  itemFilter: any;
  attributes: any[]
  lengthCriterio: any;


  constructor(
    private _searchService: SearchService,
    private routaActiva: ActivatedRoute,
    private route:Router

  ) { }

  ngOnInit() {
    this._searchService.getCriterios$().subscribe(
      (cri: any)=> {
        this.criterios = cri
        
            this.itemFilter = JSON.parse(JSON.stringify(this.criterios, function(a, b) {
              return typeof b === "string" ? b.replace(/-/gi, " ") : b
            }));

            if (Array.isArray(this.itemFilter.attribute)) {
              console.log(this.itemFilter.attribute);
              this.attributes = this.itemFilter.attribute
            }
            

      }
    )
  }

  remove(criterio:string, indexItem?) {
    console.log(this.criterios[criterio]);
    this.criterios = JSON.parse(JSON.stringify(this.criterios));
    
    if (this.criterios[criterio]) {
      

      
      if(this.attributes && this.attributes.length >=2){
      
        this.criterios.attribute.splice(indexItem, 1);
        this.attributes.splice(indexItem, 1)
        console.log('arr');
        
        this.route.navigate(['/listado'], { queryParams: this.criterios })

      }else{
        console.log('noarr');
        
        delete this.criterios[criterio]
        // this._searchService.criterios$.next(this.criterios)
        this.route.navigate(['/listado'], { queryParams: this.criterios })
      }
    }

  }
}
