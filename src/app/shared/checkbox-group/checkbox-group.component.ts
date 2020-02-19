import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CheckboxItem } from './CheckboxItem';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss']
})
export class CheckboxGroupComponent implements OnInit, OnChanges {
  @Input() options = Array<CheckboxItem>();
  @Input() selectedValues = Array<string>();
  @Output() toggle = new EventEmitter<any[]>();
  form = new FormGroup({
    items: new FormArray([])
  });
  constructor() { }
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }



  ngOnInit() {

    this.form.valueChanges.subscribe(value => {
     const optionsChecked = new Array<any>();

     for (let index = 0; index < this.items.length; index++) {
      const isOptionChecked = this.items.get(index.toString()).value;
      if (isOptionChecked) {
       const currentOptionValue = this.options[index].value;
       optionsChecked.push(currentOptionValue);
      }
     }

     this.toggle.emit(optionsChecked);
    });

    if(this.options){
      this.selectedValues.forEach(value => {
       const index: number = this.options.findIndex(opt => opt.value === value); 
       if (index >= 0) {
         this.items.get(index.toString()).setValue(true);
        }
      });
    }
  }
  
  ngOnChanges() {
    if (this.items.length === 0 && this.options) {
     this.options.forEach(x => {
       this.items.push(new FormControl(false));
     });
    }
    if(this.options){
      this.selectedValues.forEach(value => {
       const index: number = this.options.findIndex(opt => opt.value === value); 
       if (index >= 0) {
         this.items.get(index.toString()).setValue(true);
        }
      });
    }



   }


  }

