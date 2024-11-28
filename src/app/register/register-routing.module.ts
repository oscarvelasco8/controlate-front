import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {PersonalComponent} from './components/personal/personal.component';
import {UsernameComponent} from './components/username/username.component';

const routes: Routes = [
  {
    path:'',
    component:RegisterPageComponent,
    children:[
      {
        path:'personal', component:PersonalComponent
      },
      {
        path:'usuario', component:UsernameComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
