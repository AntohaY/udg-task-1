import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ItemService } from 'src/app/shared/data-access/item.service';
import { Chart } from 'chart.js/auto';


@Component({
    selector: 'app-graph',
    template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Graph </ion-title>
        <ion-button fill="solid" color="warning" routerLink="/home">Home</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="canvas-container">
        <canvas id="myChart"></canvas>
      </div>
    </ion-content>
    `,
    styles: [`
      .canvas-container {
        max-width: 1200px;
      }
    `]
})

export class GraphComponent implements OnInit {
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {

    this.itemService.getGenderPercentageForGraph().subscribe(data => {
      const myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: [''],
          datasets: [{
            label: 'Gender graph',
            data: [null],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
        }
      });
      data.forEach((item, index) => {
        myChart.data.labels![index] = item.title;
        myChart.data.datasets[0].data[index] = item.value;
      })
    })
  }
}

@NgModule({
    imports: [
      CommonModule,
      IonicModule,
      RouterModule.forChild([
        {
          path: '',
          component: GraphComponent,
        },
      ]),
    ],
    declarations: [GraphComponent],
  })
  export class GraphComponentModule {}