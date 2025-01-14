import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'controlate-front';
  constructor(private localStorageService: LocalStorageService) {
  }

  // Método que se ejecuta al iniciar la aplicación. Establece el tema de la misma.
  ngOnInit(): void {
    const link = document.getElementById("theme");
    if(this.localStorageService.darkTheme){
      link?.setAttribute("href", "themes/aura-dark-blue.css");
    }else{
      this.localStorageService.isLightTheme();
      link?.setAttribute("href", "themes/aura-light-blue.css");
    }
  }

}
