import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Result, DataResult } from 'src/app/interfaces/resultado';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  resultados: any[]
  criterios$: Observable<any>;
  marca = ''
  modelo = ''
  ano = ['', '']
  precio = ['', '']
  subscRes: any;
  objet: any;


  constructor(
    private routaActiva: ActivatedRoute,
    private _searchService: SearchService
  ) { }

  ngOnInit() {
    this.newCriterios()

  }


  getResult() {
    // console.log(criterio);
    this.criterios$ = this._searchService.getCriterios$();
    this.criterios$.subscribe(
      (criterio) => {
        // console.log(criterio);

        this._searchService.search(criterio)
          .subscribe(
            (res: Result) => {
                  this.resultados = res.data
                  this._searchService.resultados$.next(res)

            }
          );        
      }
    )


  }

  newCriterios() {
    
    this.routaActiva.queryParamMap.subscribe(
      (params:any) => {
        const parametros = {...params}
        // console.log(parametros.params);
        
        
          

            this._searchService.criterios$.next(parametros.params)
            this.getResult();         

        
      }
    )
    
  }



}
