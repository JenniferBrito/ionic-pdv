import { FormControl }from '@angular/forms';

export class PriceValidator{
  static isValid(control: FormControl): any{
    if (control.value == 0){
      return  {isValid: true }
    }

    return null;
  }
}
