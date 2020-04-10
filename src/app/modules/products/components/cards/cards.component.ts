import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

@Input('data')data :any;


  constructor() { }

  ngOnInit() {
    // console.log(this.data);
    
    
  }

}
