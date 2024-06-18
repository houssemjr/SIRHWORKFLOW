import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CalendrierRHComponent } from '../../dashboard/calendrier-rh/calendrier-rh.component';
import { CalendarComponent } from '../../dashboard/calendar/calendar.component';
import { InitComponent } from '../init/init.component';
import { TauxAbsenceAujourdhuiComponent } from '../taux-absence-aujourdhui/taux-absence-aujourdhui.component';
import { LeaveService } from '../../../services/leave.service';
import { Leave } from '../../../interfaces/leave.model';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-absencemanager',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    CalendarComponent,
    CalendrierRHComponent,
    FormsModule,
    InitComponent,
    TauxAbsenceAujourdhuiComponent
  ],
  templateUrl: './absencemanager.component.html',
  styleUrls: ['./absencemanager.component.css']
})
export class AbsencemanagerComponent implements OnInit {
  public doughnutChartOptions: any;
  public absents: any[] = [];
  public pendingRequests: any[] = [];

  constructor(private leaveService: LeaveService, private globalService: GlobalService) {}

  ngOnInit(): void {
    this.doughnutChartOptions = {
      series: [70, 30], // Example data
      chart: {
        type: 'donut',
        height: 200
      },
      labels: ['Présent', 'Absent'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };

    // Fetch absents list
    this.loadAbsents();

    // Fetch pending requests from the backend
    this.loadPendingRequests();
  }

  loadAbsents() {
    this.leaveService.getall().subscribe((leaves: Leave[]) => {
      const absentPromises = leaves.map(leave =>
        this.globalService.getUsernameById(leave.idEmployee).toPromise().then(username => {
          if (username) {
            return this.globalService.getUserByUsername(username).toPromise().then(userInfo => {
              if (userInfo) {
                return {
                  name: `${userInfo.nom} ${userInfo.prenom}`,
                  photoUrl: `http://localhost:8884${userInfo.photodeProfil}` || 'assets/default-avatar.png'
                };
              } else {
                return null;
              }
            });
          } else {
            return null;
          }
        })
      );

      Promise.all(absentPromises).then(absents => {
        this.absents = absents.filter(absent => absent !== null);
      });
    });
  }

  loadPendingRequests() {
    this.leaveService.getAllLeaves().subscribe((leaves: Leave[]) => {
      const requestPromises = leaves.map(leave =>
        this.globalService.getUsernameById(leave.idEmployee).toPromise().then(username => {
          if (username) {
            return this.globalService.getUserByUsername(username).toPromise().then(userInfo => {
              if (userInfo) {
                return {
                  name: `${userInfo.nom} ${userInfo.prenom}`,
                  photoUrl: `http://localhost:8884${userInfo.photodeProfil}` || 'assets/default-avatar.png',
                  leaveType: leave.leaveType,
                  startDate: leave.startDate,
                  endDate: leave.endDate
                };
              } else {
                return null;
              }
            });
          } else {
            return null;
          }
        })
      );

      Promise.all(requestPromises).then(requests => {
        this.pendingRequests = requests.filter(request => request !== null);
      });
    });
  }
}
