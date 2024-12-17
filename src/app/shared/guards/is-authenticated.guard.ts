import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {MessageService} from 'primeng/api';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(LocalStorageService);
  const router = inject(Router);
  const message = inject(MessageService);

  if (authService.getLoginStatus()) {
    return true; // El usuario está autenticado, permite el acceso
  } else {
    message.add({ severity: 'error', summary: 'Error', detail: 'No estás logado, por favor, lógate para poder acceder al contenido' });
    router.navigate(['/login']); // Redirige a la página de login
    return false; // Bloquea el acceso
  }
};
