import { Component } from '@angular/core';
import {MegaMenuItem} from 'primeng/api';

@Component({
  selector: 'shared-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  public items: MegaMenuItem[] = [
    {
      label: 'Home',
      routerLink: 'home',
      routerLinkActive: 'active'
    },
    {
      label: 'Macronutrientes',
      routerLink: 'calories',
      routerLinkActive: 'active'
    },
    {
      label: 'Diabetes',
      routerLink: 'diabetes',
      routerLinkActive: 'active'
    },
  ];
}
