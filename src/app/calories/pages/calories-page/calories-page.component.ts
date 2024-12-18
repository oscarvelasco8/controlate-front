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
  dailyCalories:number = 0;
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
    /*private localStorageService:LocalStorageService*/
  ) {
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData():void{
    forkJoin({
      dailyCalories: this.userService.getDailyCalories(),
      tmb: this.userService.getTmb(),
      userObjective: this.userService.getUserObjective(),
    }).subscribe({
      next: ({ dailyCalories, tmb, userObjective }) => {
        // Configurar el objetivo del usuario

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
        console.error('Error fetching data:', err);
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
