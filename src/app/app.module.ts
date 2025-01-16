import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MessageService} from 'primeng/api';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ToastModule} from "primeng/toast";
import {authInterceptor} from './shared/interceptors/auth.interceptor';

// Definimos el módulo principal
@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        ToastModule
    ],
  providers: [MessageService, provideHttpClient(withInterceptors([authInterceptor]))], // Indicamos que queremos utilizar el interceptor en las peticiones HTTP
  bootstrap: [AppComponent]
})
export class AppModule { }
