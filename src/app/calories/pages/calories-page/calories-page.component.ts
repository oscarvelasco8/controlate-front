import {Component, OnInit} from '@angular/core';

import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {FoodHistory} from '../../../shared/interfaces/foodHistory';
import {UserService} from '../../../shared/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-calories-page',
  templateUrl: './calories-page.component.html',
  styleUrl: './calories-page.component.css'
})
export class CaloriesPageComponent implements OnInit{
  date:string = '';
  userTmb:number = 0;
  userObjectiveOptions: any[] = [
    { name: 'Bajar de peso ligeramente', code: '1' , value:'BAJAR_LIGERO' },
    { name: 'Bajar de peso moderadamente', code: '2', value: 'BAJAR_MODERADO' },
    { name: 'Mantenimiento', code: '3', value: 'MANTENIMIENTO' },
    { name: 'Subir de peso ligeramente', code: '4', value: 'SUBIR_LIGERO' },
    { name: 'Subir de peso moderadamente', code: '5', value: 'SUBIR_MODERADO' }];

  public userObjectiveForm: FormGroup = this.formBuilder.group({
    objective: [null, [Validators.required]]
  });

  constructor(
    private foodHistoryService:FoodHistoryService,
    private userService:UserService,
    private formBuilder:FormBuilder,
    private messageService:MessageService,
    private localStorageService:LocalStorageService
  ) {
  }

  onDateChange($event: string) {
    /*console.log("llamada 2")*/
    this.date = $event;
    this.foodHistoryService.getHistoryByDate(this.date);
    this.foodHistoryService.getTotalCaloriesWeek(this.date);

  }

  ngOnInit(): void {
    this.date = new Date().toLocaleDateString();
    this.foodHistoryService.getHistoryByDate(this.date);

    this.userService.tmb.subscribe({
      next: (data) => {
        this.userTmb = Math.round(data);
      }
    });

    this.userService.getUserObjective().subscribe({
      next: (response) => {
        this.userService.userObjective.set(response);
      },
      error: (err) => {
        console.error('Error fetching user objective:', err);
      }
    });
  }

  get history():FoodHistory[]{
    return this.foodHistoryService.history;
  }

    protected readonly localStorage = localStorage;

  saveUserObjective():void {
    const objective = this.userObjectiveForm.controls['objective'].value.value
    this.userService.saveUserObjective(objective).subscribe({
      next:() => {
        this.messageService.add({ severity: 'success', summary: 'Busqueda exitosa', detail: '¡Preferencias guardadas!' });
        this.localStorageService.saveUserObjective(objective);
        this.userService.userObjective.set(objective);
      },
      error:() =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar las preferencias' });
      }
    })
  }

  get userObjective():string{
    return this.userService.userObjective();
  }
}
