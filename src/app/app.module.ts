import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MessageService} from 'primeng/api';
import {provideHttpClient} from '@angular/common/http';
import {ToastModule} from "primeng/toast";


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
  providers: [MessageService, provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
