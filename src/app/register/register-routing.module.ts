import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {PersonalFormComponent} from './components/personal-form/personal-form.component';
import {ActividadFormComponent} from './components/actividad-form/actividad-form.component';
import {UserFormComponent} from './components/user-form/user-form.component';

const routes: Routes = [
  {
    path:'',
    component:RegisterPageComponent,
    children:[
      {
        path:'', redirectTo:'personal-form', pathMatch:'full'
      },
      {
        path:'personal-form', component:PersonalFormComponent
      },
      {
        path:'activity', component:ActividadFormComponent
      },
      {
        path:'user', component:UserFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
