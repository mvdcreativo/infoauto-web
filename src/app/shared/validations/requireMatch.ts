import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';     
    


@Injectable()
export class CustomValidate {

  autocompleteObjectValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (typeof control.value === 'string') {
        return { 'invalidAutocompleteObject': { value: control.value } }
      }
      return null  /* valid option selected */
    }
  }

}