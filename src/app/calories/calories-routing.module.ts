import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaloriesPageComponent } from './pages/calories-page/calories-page.component';

//Rutas del módulo de calorías
const routes: Routes = [
  {
    path: '',
    component: CaloriesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaloriesRoutingModule { }
