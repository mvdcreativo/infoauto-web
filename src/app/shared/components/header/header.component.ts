import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CompareService } from 'src/app/modules/products/services/compare.service';
import { Comparador } from 'src/app/modules/products/interfaces/comparador';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mvd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('color') color: any = false;
  @Input('mostrar') mostrar;
  @Output() clickMenu = new EventEmitter<any>();
  fontColor: string;
  inputSearch: boolean =true;
  compareItems: Comparador[];

  position = "after";
  constructor(
    private breakpointObserver: BreakpointObserver,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private compareService: CompareService,
  ) { 
    this.matIconRegistry.addSvgIcon(
      "nuevos",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/ico-nuevo.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "usados",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/ico-usado.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "guia",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/ico-guia.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "compare",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/ico-compara.svg")
    );


      
      this.compareService.getItems().subscribe(compareItems => this.compareItems = compareItems);
    }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit(): void {
    if (this.color === 'transparent') {
      this.fontColor = "#ffffff";
      this.inputSearch = false;
    }


  }


  toggle(){
    console.log("emit");
    
    this.clickMenu.emit();
  }

}
