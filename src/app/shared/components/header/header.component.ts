import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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


  constructor(
    private breakpointObserver: BreakpointObserver
    ) { }

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
