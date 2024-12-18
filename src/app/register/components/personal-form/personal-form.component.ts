import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterValidatorService} from '../../services/register-validator.service';
import {FormValidatorService} from '../../../shared/services/form-validator.service';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PersonalFormComponent implements OnInit{
  public personalForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastname: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    gender: ['',[Validators.required]]
  })
  genderOptions: any[] = [{ name: 'Hombre', code: '1', value:'MALE' }, { name: 'Mujer', code: '2', value: 'FEMALE' }];

  constructor(
    private router:Router,
    private messageService: MessageService,
    private formBuilder:FormBuilder,
    private registerValidatorService: RegisterValidatorService,
    private formValidatorService: FormValidatorService
  ) {
  }
  onSubmit():void{
    if (this.personalForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete todos los campos.' })
      return
    }
    this.messageService.add({ severity: 'success', summary: 'Datos guardados', detail: 'Datos personales guardados con éxito' })
    this.formValidatorService.name = this.personalForm.get('name')?.value;
    this.formValidatorService.lastName = this.personalForm.get('lastname')?.value;
    this.formValidatorService.email = this.personalForm.get('email')?.value;
    this.formValidatorService.gender = this.personalForm.get('gender')?.value.value.toUpperCase();

    this.router.navigate(['/register/activity']);

  }

  isValidField( field: string ): boolean | null {
    return this.registerValidatorService.isValidField(this.personalForm, field);
  }
  getFieldError( field: string ): string | null {
    return this.registerValidatorService.getFieldError(this.personalForm, field);
  }

  ngOnInit(): void {
    this.personalForm.setValue({
      name: this.formValidatorService.userInfo.name,
      lastname: this.formValidatorService.userInfo.lastname,
      email: this.formValidatorService.userInfo.email,
      gender: this.genderOptions.find(option => option.value === this.formValidatorService.userInfo.gender) || this.formValidatorService.userInfo.gender
    });
  }
}
