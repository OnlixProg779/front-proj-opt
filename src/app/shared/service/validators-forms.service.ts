import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsFormsService {

  constructor() { }

  getErrorField(form: FormGroup, field: string, msg: string){
    var campo = form.get(field);
    if(campo.hasError('required')){

      return `·${msg} field is required`
    }
    return '';
  }

}
