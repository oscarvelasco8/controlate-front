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
  userWantsModifyObjective:boolean = false;
  userObjectiveName:string = '';
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

    this.userService.getUserObjective().subscribe({
      next: (response) => {
        this.userService.userObjective.set(response);
        this.getUserData();
        this.userObjectiveName = this.userObjectiveOptions.find(item => item.value === this.userService.userObjective()).name;
      },
      error: (err) => {
        console.error('Error fetching user objective:', err);
      }
    });
  }

  getUserData():void{
    this.userService.tmb.subscribe({
      next: (data) => {
        this.userTmb = Math.round(data);
        this.userService.tmbObjective.set(Math.round(data));
        this.getObjectivesInBaseOfTmb()
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
        this.getUserData();
      },
      error:() =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar las preferencias' });
      }
    })
    this.userWantsModifyObjective = false;
  }

  get userObjective():string{
    return this.userService.userObjective();
  }
  modifyObjective(){
    this.userWantsModifyObjective = !this.userWantsModifyObjective;
  }

  private getObjectivesInBaseOfTmb() {
    // Obtén la TMB ajustada al factor de actividad
    const tmbAdjusted:number = this.userService.tmbObjective();

    switch (this.userService.userObjective()) {
      case 'BAJAR_LIGERO':
        // Reducir un 10% de las calorías de mantenimiento
        this.userService.tmbAdjusted.set(tmbAdjusted * 0.9);
        break;

      case 'BAJAR_MODERADO':
        // Reducir un 20% de las calorías de mantenimiento
        this.userService.tmbAdjusted.set(tmbAdjusted * 0.8);
        break;

      case 'MANTENIMIENTO':
        // Mantener las calorías de mantenimiento
        this.userService.tmbAdjusted.set(tmbAdjusted);
        break;

      case 'SUBIR_LIGERO':
        // Aumentar un 10% de las calorías de mantenimiento
        this.userService.tmbAdjusted.set(tmbAdjusted * 1.1);
        break;

      case 'SUBIR_MODERADO':
        // Aumentar un 20% de las calorías de mantenimiento
        this.userService.tmbAdjusted.set(tmbAdjusted * 1.2);
        break;

      default:
        throw new Error('Objetivo no definido');
    }

    // Distribución de macronutrientes (% de las calorías totales)
    // 1g de proteína = 4 cal, 1g de carbohidrato = 4 cal, 1g de grasa = 9 cal

    // Proporciones estándar (puedes ajustarlas según el caso)
    const proteinPercentage = 0.3; // 30% proteínas
    const fatPercentage = 0.25; // 25% grasas
    const carbPercentage = 0.45; // 45% carbohidratos

    // Cálculo en gramos
    this.userService.proteinesObjective.set((this.userService.tmbAdjusted()*proteinPercentage)/4);
    this.userService.fatsObjective.set((this.userService.tmbAdjusted()*fatPercentage)/9);
    this.userService.carbohydratesObjective.set((this.userService.tmbAdjusted()*carbPercentage)/4);
  }

}
