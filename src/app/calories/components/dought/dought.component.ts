import {Component, Input, OnInit} from '@angular/core';
import {doughtData} from '../../interfaces/doughtData';

@Component({
  selector: 'calories-dought',
  templateUrl: './dought.component.html',
  styleUrl: './dought.component.css'
})
export class DoughtComponent implements OnInit{
  doughtsData:doughtData[] = [
    {
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
    },
    {
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
    },

    {
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
    },
    {
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
    }

  ]
  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');


    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }
}
