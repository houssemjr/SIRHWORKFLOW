import { Component, OnInit } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexAxisChartSeries,
  NgApexchartsModule
} from 'ng-apexcharts';
import { CalendarComponent } from '../calendar/calendar.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CalendrierRHComponent } from '../calendrier-rh/calendrier-rh.component';

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'absence-dashboard',
  standalone: true,
  templateUrl: './absence-dashboard.component.html',
  styleUrls: ['./absence-dashboard.component.css'],
  imports: [NgApexchartsModule,CalendarComponent,RouterModule,MatIconModule,CalendrierRHComponent]
})
export class AbsenceDashboardComponent implements OnInit {
  public dailyAbsenceChartOptions: PieChartOptions = {
    series: [],
    chart: {
      type: 'pie',
      width: 380
    },
    responsive: [],
    labels: []
  };
  public thirtyDaysAbsenceChartOptions: LineChartOptions = {
    series: [{ name: '', data: [] }],
    chart: {
      type: 'line',
      height: 350
    },
    xaxis: {
      categories: []
    },
    title: {
      text: '',
      align: 'left'
    }
  };
  public absenceTypeChartOptions: PieChartOptions = {
    series: [],
    chart: {
      type: 'pie',
      width: 380
    },
    responsive: [],
    labels: []
  };

  ngOnInit(): void {
    this.dailyAbsenceChartOptions = {
      series: [80, 20], // Exemples de données
      chart: {
        type: 'pie',
        width: 380
      },
      labels: ['Présent', 'Absent'],
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
      ]
    };

    this.thirtyDaysAbsenceChartOptions = {
      series: [
        {
          name: 'Taux d\'absence',
          data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59]
        }
      ],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: Array.from({ length: 30 }, (_, i) => `Jour ${i + 1}`)
      },
      title: {
        text: 'Taux d\'absence des 30 derniers jours',
        align: 'left'
      }
    };

    this.absenceTypeChartOptions = {
      series: [50, 30, 20], // Exemples de données
      chart: {
        type: 'pie',
        width: 380
      },
      labels: ['Congé maladie', 'Congé annuel', 'Congé maternité'],
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
      ]
    };
  }
}
