import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-taux-absence-aujourdhui',
  standalone: true,
  templateUrl: './taux-absence-aujourdhui.component.html',
  styleUrls: ['./taux-absence-aujourdhui.component.css'],
  imports: [NgApexchartsModule,CommonModule]
})
export class TauxAbsenceAujourdhuiComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [75, 25], // Exemple de données statiques (75% présents, 25% absents)
      chart: {
        type: 'donut',
        height: 300
      },
      labels: ["Présent", "Absent"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      title: {
        text: "Taux d'Absence Aujourd'hui"
      }
    };
  }

  ngOnInit() {}
}
