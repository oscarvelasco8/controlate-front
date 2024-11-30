import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {PersonalComponent} from './components/personal/personal.component';
import {ActividadComponent} from './components/actividad/actividad.component';

const routes: Routes = [
  {
    path:'',
    component:RegisterPageComponent,
    children:[
      {
        path:'', redirectTo:'personal', pathMatch:'full'
      },
      {
        path:'personal', component:PersonalComponent
      },
      {
        path:'activity', component:ActividadComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
