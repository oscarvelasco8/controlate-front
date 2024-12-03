import { Component } from '@angular/core';
import {doughtData} from '../../interfaces/doughtData';

@Component({
  selector: 'app-calories-page',
  templateUrl: './calories-page.component.html',
  styleUrl: './calories-page.component.css'
})
export class CaloriesPageComponent {
  totalData:doughtData ={
    labels:['Proteinas','Carbohidratos','Grasas'],
    datasets:[
      {
        data:[100,200,300],
        backgroundColor: [
          'rgb(60,50,140)',
          'rgb(114,234,142)',
          'rgb(255, 99, 132)'
        ],
        hoverOffset: 4
      }
    ]
  };

  proteinData:doughtData ={
    labels:['Proteinas', 'Total'],
    datasets:[
      {
        data:[100,200],
        backgroundColor: [
          'rgb(60,50,140)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 4
      }
    ]
  };

  carbsData:doughtData ={
    labels:['Carbohidratos', 'Total'],
    datasets:[
      {
        data:[100,200],
        backgroundColor: [
          'rgb(114,234,142)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 4
      }
    ]
  };

  fatsData:doughtData ={
    labels:['Grasas', 'Total'],
    datasets:[
      {
        data:[100,200],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 4
      }
    ]
  };
}
