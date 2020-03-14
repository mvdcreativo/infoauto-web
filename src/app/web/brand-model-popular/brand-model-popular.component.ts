import { Component, OnInit, HostListener } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'brand-model-popular',
  templateUrl: './brand-model-popular.component.html',
  styleUrls: ['./brand-model-popular.component.scss']
})
export class BrandModelPopularComponent implements OnInit {
  itemsLimit: any;
  
  // @HostListener('window:resize', ['$event'])
  // onResize(event){
  //   this.width = event.target.innerWidth;
  //   this.heigth = event.target.innerHeight;

  //   if(this.width <= 1500){
  //     this.limit = 5
  //     this.itemsLimit = this.items.slice(0,this.limit)
  //     console.log(this.itemsLimit);
      
  //   }else{
  //     this.limit = 6
  //     this.itemsLimit = this.items.slice(0,this.limit)
  //     console.log(this.itemsLimit);
  //   }
  // }

  items: any;
  heigth: number;
  width: number;
  limit: number = 8
  models: any;
  urlImageBack: string = `${environment.urlFiles}`
  constructor(
    private _searchService: SearchService
  ) { }


  ngOnInit() {
    
    this._searchService.getAllBrands(this.limit).subscribe(
      (res:any)=> {
        this.items = res
      }
    )
    
    
  }
  
 

}
