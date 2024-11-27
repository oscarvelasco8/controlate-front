import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiabetesPageComponent } from './pages/diabetes-page/diabetes-page.component';

const routes: Routes = [{
  path: '',
  component: DiabetesPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiabetesRoutingModule { }
