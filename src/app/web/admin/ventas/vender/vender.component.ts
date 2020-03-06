import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
export class VenderComponent implements OnInit {

  public config: PerfectScrollbarConfigInterface = {
    suppressScrollX : false,
  };


  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) { 
      this.matIconRegistry.addSvgIcon(
        'step',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/step.svg')
      );
    }
    

  ngOnInit() {   
    
  }






}
