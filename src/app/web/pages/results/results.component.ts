import { Component, OnInit, HostListener } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Result } from 'src/app/interfaces/resultado';
import { take } from 'rxjs/operators';
import { SearchFilters } from 'src/app/interfaces/search-filters';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],

})
export class ResultsComponent implements OnInit {
  private linesToWrite: Array<string>;
  // private logService: LogService;
  private LOG_TAG = 'INFINITE_SCROLL_EXAMPLE_COMPONENT: ';

  private finishPage = 150;
  private actualPage: number;
  private showGoUpButton: boolean;
  showScrollHeight = 400;
  hideScrollHeight = 200;
  ultPage: any;

  

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if ( this.showGoUpButton && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }
  
  resultados: any = []
  criterios: SearchFilters
  selector: string = ".main-result"

  constructor(
    private _searchService : SearchService
  ) {
    // this.logService = new LogS7ervice(this.LOG_TAG);
    this.actualPage = 1;
    this.showGoUpButton = false;
   }

  ngOnInit() {
    // this.logService = new LogService(this.LOG_TAG);
    this.getResult()
    this._searchService.getCriterios$().pipe(take(1)).subscribe(
      (criterio) => {
        this.criterios = criterio;
        // this._searchService.criterios$.next({...this.criterios, page: this.actualPage})
        
        
      }
    )
  }

  addResult() {

    this.criterios = {...this.criterios , page: this.actualPage}
    this._searchService.search(this.criterios)
          .subscribe(
            (res: Result) => {
                  let datos = res.data
                  this.resultados = this.resultados.concat(datos)

            }
          );        
    // this._searchService.criterios$.next()

    

  }

  onScroll() {
    // this.logService.print('Scrolled!', LogService.DEFAULT_MSG);
    if (this.actualPage < this.finishPage) {
      this.actualPage ++;
      this.addResult();
    } else {
      // this.logService.print('No more lines. Finish page!', LogService.DEFAULT_MSG);
    }
  }
  onScrollUp(){
    console.log('scrollUp');
    
  }

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }




  getResult() {
    // console.log(criterio);
    
    this._searchService.getResultados$()
      .subscribe(
      (res:any) => {
        
        
        this.resultados= res.data
        this.finishPage = res.last_page
        
      }
    )

  }


}
