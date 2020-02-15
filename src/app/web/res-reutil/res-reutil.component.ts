import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'res-reutil',
  templateUrl: './res-reutil.component.html',
  styleUrls: ['./res-reutil.component.scss']
})
export class ResReutilComponent implements OnInit {

  @Input('criterio') criterio: any;

  resultados : any

  constructor(
    private _searchService: SearchService
  ) { }

  ngOnInit() {
    
    // console.log(this.criterio);
   return this._searchService.search(this.criterio).subscribe(
     (res)=> {
       this.resultados= res.data
      //  console.log(res);
       let cr = this._searchService.criterios$.value;
      //  console.log(cr);
       
       
     }
   );
  }




}
