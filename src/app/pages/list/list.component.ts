import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Result } from 'src/app/modules/products/interfaces/resultado';
import { SearchFilters } from 'src/app/modules/products/interfaces/search-filters';
import { SearchService } from 'src/app/modules/products/services/search.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mvd-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  resData$: Observable<Result[]>;
  modelos: any = [];
  marcas: any = []
  attributes: any = [];
  sub_models: any = [];
  conditions: any = [];
  cities: any = [];
  extras: any = [];
  anos: any = [];
  precios: any = [];
  stateB: boolean = false;
  stateM: boolean = false;
  stateC: boolean = false;
  stateP: boolean = false;
  stateA: boolean = false;
  stateY: boolean = false;
  stateS: boolean = false;
  resultTotal: number;
  resData: any;
  queryAttributes = []
  criterios$: Observable<SearchFilters>;
  criterio: SearchFilters;
  resultados: any[]
  








  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  yearmin: number;
  yearmax: number;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _searchService: SearchService,
    private route: Router,
    private routaActiva: ActivatedRoute,
  ) { }



  ngOnInit() {
    this.newCriterios()
    
    this.resData$ = this._searchService.getResultados$();
    this.resData$.subscribe(
      (res: any) => {
        this.resData = res.data
        // console.log(this.resData);
        this.resultTotal = res.total

        this.criterios$ = this._searchService.getCriterios$();
        this.criterios$.subscribe(
          (criterio) => {
            // console.log(criterio);
            this.criterio = criterio
            this.stateMarcas(false)
            this.stateModel(false)
            this.stateCondition(false)
            this.stateSubmodel(false)
            this.stateAttributes(false)

          }
        )
      }
    )
    this.selectAnos();
    this.selectPrecios();

    console.log(this.criterio);

  }

  getResult() {
    // console.log(criterio);
    this.criterios$ = this._searchService.getCriterios$();
    this.criterios$.subscribe(
      (criterio) => {
        // console.log(criterio);
        if(criterio){
          this.yearmin = criterio.yearmin
          this.yearmax = criterio.yearmax
    
        }
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





///sideBar
  addCriterios(campo, criterioFilter) {

    if (campo === "attribute") {
      //SI ES UN ATTRIBUTO
      this.criteriosAttributes(criterioFilter)
    } else {
      ///SI NO ES UN ATTRIBUTO
      let query = {}

      query[campo] = criterioFilter
      console.log(query);

      this.route.navigate(['/listado'], { queryParams: query, queryParamsHandling: 'merge' })
    }




  }

  criteriosAttributes(criterioFilter) {
    if (this.criterio.attribute) {
      var attr: any = {}

      for (const key in this.criterio) {
        if (this.criterio.hasOwnProperty(key)) {
          attr[key] = this.criterio[key];
        }
      }
      if (Array.isArray(attr.attribute)) {
        attr.attribute.push(criterioFilter)
      } else {
        attr.attribute = [this.criterio.attribute]
        attr.attribute.push(criterioFilter)
      }


      this._searchService.criterios$.next(attr)
      this.route.navigate(['/listado'], { queryParams: attr })

    } else {
      let criterio = { attribute: [] }
      criterio.attribute = Array()
      criterio.attribute.push(criterioFilter)
      console.log(criterio);
      // this._searchService.criterios$.next(criterio)

      this.route.navigate(['/listado'], { queryParams: criterio, queryParamsHandling: 'merge' })

    }
    // console.log(this.criterio[campo]);
  }

  stateMarcas(state) {
    this.marcas = this.mostrarState(state, 'brand')
  }
  stateModel(state) {
    if (this.marcas.length <= 1) {
      this.modelos = this.mostrarState(state, 'vehicle_model')
    }
  }
  stateAttributes(state) {
    this.attributes = this.mostrarState(true, 'attributes')
    // console.log(this.attributes);
    // console.log(this.criterio.attribute);

    if(this.criterio.attribute){
      this.attributes = this.attributes.filter(val => !this.criterio.attribute.includes(val.slug));
      console.log(this.attributes);
    }

  }
  stateSubmodel(state) {
    this.sub_models = this.mostrarState(state, 'vehicle_sub_model')
  }
  stateCondition(state) {
    this.conditions = this.mostrarState(state, 'condition')
  }

  mostrarState(state: boolean, campo: string) {
    if (state) {
      const ret: any = this.eliminarObjetosDuplicados(this.opsFiltro(campo), 'id');

      return ret
    } else {
      const ret: any = this.eliminarObjetosDuplicados(this.opsFiltro(campo), 'id').slice(0, 5);
      // console.log(ret);

      return ret
    }
  }

  opsFiltro(campo: any) {

    var item: any = [];
    // console.log(this.resData);

    if (this.resData) {
      this.resData.forEach(items => {
        if (Array.isArray(items[campo])) {
          items[campo].forEach(items => {
            item.push(items)
          });
        } else {
          // console.log(items);

          item.push(items[campo])
        }
      })
      return item
    }


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


  selectAnos() {
    let anos = [];
    let anoAct = new Date().getFullYear();
    for (let i = 1930; i <= anoAct; i++) {

      anos.push({ 'value': i, 'option': i });
    }
    this.anos = anos.reverse();
    // console.log(this.anos);
  }

  selectPrecios() {
    let value = 0
    let arrprecios = Array(250);
    for (let i = 0; i < arrprecios.length; i++) {
      value = value + 1000;
      this.precios.push({ 'value': value, 'option': value });
    }
    // let json= JSON.stringify(this.precios)
    // console.log(this.precios);
  }


}
