import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {isAuthenticatedGuard} from './shared/guards/is-authenticated.guard';

// Rutas del módulo principal. La carga de los módulos se realiza mediante lazy loading o carga perezosa
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'calories',
    loadChildren: () => import('./calories/calories.module').then(m => m.CaloriesModule),
    canActivate: [isAuthenticatedGuard] // Ruta protegida por un guardian que verifica si el usuario está autenticado o no para bloquear el acceso
  },
  {
    path: 'diabetes',
    loadChildren: () => import('./diabetes/diabetes.module').then(m => m.DiabetesModule),
    canActivate: [isAuthenticatedGuard] // Ruta protegida por un guardian que verifica si el usuario está autenticado o no para bloquear el acceso
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'modify-profile',
    loadChildren: () => import('./modify-profile/modify-profile.module').then(m => m.ModifyProfileModule),
    canActivate: [isAuthenticatedGuard] // Ruta protegida por un guardian que verifica si el usuario está autenticado o no para bloquear el acceso
  },
  {
    path: '**',
    redirectTo: 'home' // Ruta por defecto cuando esta no es reconocida
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
