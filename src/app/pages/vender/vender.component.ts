import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay, take } from 'rxjs/operators';
import { PublishService } from 'src/app/modules/ventas/services/publish.service';


@Component({
  selector: 'vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
export class VenderComponent implements OnInit , AfterViewInit, OnDestroy{

  public config: PerfectScrollbarConfigInterface = {
    suppressScrollX : false,
  };

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  publicationId: any = '';
  subscribe: any;
  movil: boolean;
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private breakpointObserver: BreakpointObserver,
    private _publishService : PublishService

    ) { 
      this.matIconRegistry.addSvgIcon(
        'step',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/images/step.svg')
      );
    }
    

  ngOnInit() {   
    this.isHandset$.subscribe(
      res=> this.movil = res
    )
    
    
  }
  ngAfterViewInit(){
    this.subscribe = this._publishService.publication.subscribe(
      res =>{ 
        console.log(res);
        if(res){
          this.publicationId = res.id
        }
       }
    )
  }


  ngOnDestroy(){
    this.subscribe.unsubscribe()
  }




}
