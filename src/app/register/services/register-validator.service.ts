import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterValidatorService {

  // Metodo que verifica si un campo es valido
  isValidField( form: FormGroup, field: string ): boolean | null {
    return form.controls[field].errors
      && form.controls[field].touched;
  }

  // Metodo que obtiene el error de un campo
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

  // Metodo para validar la contraseña
  passwordValidator(control: FormControl):ValidationErrors | null {
    const value = control.value;

    if ( value.length < 8  || !/[A-Z]/.test(value) || !/[0-9]/.test(value) ) {
      return { password: true };
    }
    return null;
  }

  // Metodo para validar la contraseña utilizado en la modificación del perfil de usuario. No es un metodo que se utilice como verficador, más bien se añade como validador
  passwordValidator2():ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if ( value.length < 8  || !/[A-Z]/.test(value) || !/[0-9]/.test(value) ) {
        return { password: true };
      }
      return null;
    }
  }

  // Metodo para validar el correo
  emailValidator(control: FormControl):ValidationErrors | null {
    const value = control.value;
    if ( !value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/) ) {
      return { email: true };
    }
    return null;
  }
}
