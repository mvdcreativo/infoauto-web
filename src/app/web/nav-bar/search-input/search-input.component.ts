import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  categories: any;
  criterios: any;

  constructor(
    private _searchService: SearchService,
    private fb: FormBuilder,
    private route: Router

  ) { }
  
  formSearch: any = this.fb.group({
    category_id: [1, Validators.required],
    searcher: [null, Validators.required],

  });


  ngOnInit() {
    this.selectCategory()
  }

  onSubmit(){
    this.criterios = this.formSearch.value
    
    this._searchService.criterios$.next(this.criterios)
    this.route.navigate(['/listado'], { queryParams: this.criterios })

  }


  selectCategory() {
    return this._searchService.getCategory().pipe(
      take(1)).
      subscribe(
        (category: any) => {
          this.categories = category
        }
      )
  }
}
