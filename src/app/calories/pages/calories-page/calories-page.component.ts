import {Component, OnInit} from '@angular/core';

import {FoodHistoryService} from '../../../shared/services/food-history.service';
import {FoodHistory} from '../../../shared/interfaces/foodHistory';
import {UserService} from '../../../shared/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {forkJoin} from 'rxjs';
import {LocalStorageService} from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-calories-page',
  templateUrl: './calories-page.component.html',
  styleUrl: './calories-page.component.css'
})
export class CaloriesPageComponent implements OnInit{

  // Atributos de la clase
  userTmb:number = 0;
  userWantsModifyObjective:boolean = false;
  userObjectiveName:string = '';
  dailyCalories:number = 0;
  protected readonly localStorage = localStorage;
  userObjectiveOptions: any[] = [
    { name: 'Bajar de peso ligeramente', code: '1' , value:'BAJAR_LIGERO' },
    { name: 'Bajar de peso moderadamente', code: '2', value: 'BAJAR_MODERADO' },
    { name: 'Mantenimiento', code: '3', value: 'MANTENIMIENTO' },
    { name: 'Subir de peso ligeramente', code: '4', value: 'SUBIR_LIGERO' },
    { name: 'Subir de peso moderadamente', code: '5', value: 'SUBIR_MODERADO' }];

  // Formulario para el objetivo del usuario
  public userObjectiveForm: FormGroup = this.formBuilder.group({
    objective: [null, [Validators.required]]
  });

  // Constructor de la clase. Se inyectan los servicios necesarios
  constructor(
    private foodHistoryService:FoodHistoryService,
    private userService:UserService,
    private formBuilder:FormBuilder,
    private messageService:MessageService,
  ) {
  }

  // Método que se ejecuta al iniciar la página
  ngOnInit(): void {
    this.getUserData();
  }

  // Método para obtener los datos del usuario
  getUserData():void{
    // Se utiliza forkJoin para obtener los datos de manera simultánea
    forkJoin({
      dailyCalories: this.userService.getDailyCalories(),
      tmb: this.userService.getTmb(),
      userObjective: this.userService.getUserObjective(),
    }).subscribe({
      next: ({ dailyCalories, tmb, userObjective }) => {
        // Configurar el objetivo del usuario, las calorías diarias y el TMB
        this.userObjectiveName = this.userObjectiveOptions.find(
          item => item.value === userObjective
        )?.name || 'Desconocido';
        this.userService.userObjective.set(this.userObjectiveName);

        this.userService.caloriesObjective.set(Math.round(dailyCalories));
        this.dailyCalories = Math.round(this.userService.caloriesObjective());

        this.userService.tmbObjective.set(Math.round(tmb));
        this.userTmb = Math.round(this.userService.tmbObjective());

        this.getObjectivesInBaseOfTmb();
      },
      error: (err) => {

      }
    });
  }

  // Método para obtener el historial de alimentos desde el servicio
  get history():FoodHistory[]{
    return this.foodHistoryService.history;
  }

  // Método para guardar el objetivo del usuario
  saveUserObjective():void {
    const objective = this.userObjectiveForm.controls['objective'].value.value
    this.userService.saveUserObjective(objective).subscribe({
      next:() => {
        this.messageService.add({ severity: 'success', summary: 'Busqueda exitosa', detail: '¡Preferencias guardadas!' });
        this.getUserData();
      },
      error:() =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar las preferencias' });
      }
    })
    this.userWantsModifyObjective = false;
  }

  // Método para obtener el objetivo del usuario
  get userObjective():string{
    return this.userService.userObjective();
  }

  // Método para modificar el objetivo del usuario
  modifyObjective(){
    this.userWantsModifyObjective = !this.userWantsModifyObjective;
  }


  // Método para obtener el objetivo de macronutrientes en base a la TMB
  private getObjectivesInBaseOfTmb() {
    const tmbAdjusted: number = this.userService.tmbObjective();
    // Distribución de macronutrientes
    const macronutrientRatios = {
      protein: 0.3 / 4,
      fat: 0.25 / 9,
      carb: 0.45 / 4
    };
    this.userService.proteinesObjective.set(tmbAdjusted * macronutrientRatios.protein);
    this.userService.fatsObjective.set(tmbAdjusted * macronutrientRatios.fat);
    this.userService.carbohydratesObjective.set(tmbAdjusted * macronutrientRatios.carb);
  }


}
