import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';
import { LeaveService } from '../../../services/leave.service';
import { AuthService } from '../../../auth.service';
import { Leave } from '../../../interfaces/leave.model';
import { MatCardModule } from '@angular/material/card';
import { Motif } from '../../../services/motif.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-absence',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, MatCardModule,MatIconModule],
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    events: [], // Initialize with an empty array
    initialDate: new Date().toISOString().split('T')[0] // Set the initial date to today
  };

  motifs: Motif[] = [];
  userLeaves: Leave[] = [];

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadLeaves();
  }

  handleDateClick(arg: DateClickArg) {
    alert('Date clicked: ' + arg.dateStr);
  }

  loadLeaves() {
    const userId = this.authService.getLoggedInUserId();
    this.leaveService.getall().subscribe((leaves: Leave[]) => {
      this.userLeaves = leaves.filter(leave => leave.idEmployee === userId);
      console.log('User Leaves:', this.userLeaves); // Debug: Print user leaves to the console

      this.motifs = this.userLeaves.map(leave => leave.motifleave).filter(motif => motif !== null);

      this.calendarOptions.events = this.userLeaves.map(leave => ({
        title: leave.leaveType,
        start: new Date(leave.startDate).toISOString().split('T')[0],
        end: new Date(leave.endDate).toISOString().split('T')[0],
        color: leave.motifleave.couleur || 'red' // Use the color from the motif or fallback to red
      }));
    });
  }
}
