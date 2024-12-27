import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterValidatorService {

  constructor() { }
  isValidField( form: FormGroup, field: string ): boolean | null {
    return form.controls[field].errors
      && form.controls[field].touched;
  }
  getFieldError(form: FormGroup, field: string ): string | null {

    if ( !form.controls[field] ) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido.';

        case 'min':
          return 'Utiliza un valor diferente a 0.';

        case 'minlength':
          return `El campo debe tener al menos ${ errors['minlength'].requiredLength } caracteres.`;

        case 'password':
          return `La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.`;

        case 'email':
          return 'El correo no es valido.';

          case 'maxLength':
            return `El campo debe tener como maximo ${ errors['maxlength'].requiredLength } caracteres.`;
      }
    }

    return null;
  }

  passwordValidator(control: FormControl):ValidationErrors | null {
    const value = control.value;

    if ( value.length < 8  || !/[A-Z]/.test(value) || !/[0-9]/.test(value) ) {
      return { password: true };
    }
    return null;
  }

  passwordValidator2():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if ( value.length < 8  || !/[A-Z]/.test(value) || !/[0-9]/.test(value) ) {
        return { password: true };
      }
      return null;
    }
  }
}
