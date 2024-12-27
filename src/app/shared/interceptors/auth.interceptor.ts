import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {LocalStorageService} from '../services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(LocalStorageService);
  const router = inject(Router);
  const message = inject(MessageService);
  const token = authService.getToken(); // Obtener el token almacenado

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.setExpired("true");
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
