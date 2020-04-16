import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CompareService } from '../../services/compare.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

@Input('data')data :any;


  constructor(    
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private compareService: CompareService,
  ) { 
    this.matIconRegistry.addSvgIcon(
      "compare",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/ico-compara.svg")
    ); 
  }

  ngOnInit() {
    // console.log(this.data);
    
    
  }

  addToCompare(product){
    this.compareService.addToCompare(product)
  }

}
