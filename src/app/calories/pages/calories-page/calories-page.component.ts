import {Component, OnInit} from '@angular/core';

import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {FoodHistory} from '../../../shared/interfaces/foodHistory';
import {UserService} from '../../../shared/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../shared/services/local-storage.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-calories-page',
  templateUrl: './calories-page.component.html',
  styleUrl: './calories-page.component.css'
})
export class CaloriesPageComponent implements OnInit{
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

/*  transformDate(inputDate: Date): Date {
    // Extraer los componentes de la fecha
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth(); // Los meses van de 0 (enero) a 11 (diciembre)
    const day = inputDate.getDate();

    // Crear un nuevo objeto Date con los componentes extraídos (hora 00:00:00)
    return new Date(year, month, day);
  }*/

  ngOnInit(): void {
    forkJoin({
      userObjective: this.userService.getUserObjective(),
      tmb: this.userService.tmb
    }).subscribe({
      next: ({ userObjective, tmb }) => {
        // Configurar el objetivo del usuario
        this.userService.userObjective.set(userObjective);
        this.userObjectiveName = this.userObjectiveOptions.find(
          item => item.value === userObjective
        )?.name || 'Desconocido';

        // Configurar TMB y objetivos
        this.userTmb = Math.round(tmb);
        this.userService.tmbObjective.set(this.userTmb);

        this.getObjectivesInBaseOfTmb();
      },
      error: (err) => {
        console.error('Error fetching data:', err);
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
    const tmbAdjusted: number = this.userService.tmbObjective();

    // Calcular TMB ajustada según el objetivo
    const adjustmentFactors: { [key: string]: number } = {
      BAJAR_LIGERO: 0.9,
      BAJAR_MODERADO: 0.8,
      MANTENIMIENTO: 1,
      SUBIR_LIGERO: 1.1,
      SUBIR_MODERADO: 1.2
    };

    const objective = this.userService.userObjective();
    const factor = adjustmentFactors[objective] || 1; // Default 1 si no coincide ningún objetivo

    const tmbFinal = tmbAdjusted * factor;
    this.userService.tmbAdjusted.set(tmbFinal);

    // Distribución de macronutrientes
    const macronutrientRatios = {
      protein: 0.3 / 4,
      fat: 0.25 / 9,
      carb: 0.45 / 4
    };

    this.userService.proteinesObjective.set(tmbFinal * macronutrientRatios.protein);
    this.userService.fatsObjective.set(tmbFinal * macronutrientRatios.fat);
    this.userService.carbohydratesObjective.set(tmbFinal * macronutrientRatios.carb);
  }


}
