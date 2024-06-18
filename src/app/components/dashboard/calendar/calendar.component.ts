import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';
import { LeaveService } from '../../../services/leave.service'; // Assurez-vous que le chemin est correct
import { Leave } from '../../../interfaces/leave.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    events: [], // Initialize with an empty array
    initialDate: new Date().toISOString().split('T')[0] // Set the initial date to today
  };

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    this.loadEvents();
  }

  handleDateClick(arg: DateClickArg) {
    alert('Date clicked: ' + arg.dateStr);
  }

  loadEvents() {
    this.leaveService.getall().subscribe((leaves: Leave[]) => {
      this.calendarOptions.events = leaves.map(leave => ({
        title: leave.leaveType,
        start: new Date(leave.startDate).toISOString().split('T')[0],
        end: new Date(leave.endDate).toISOString().split('T')[0],
        color: leave.motifleave?.couleur || 'gray' // Use the color from the motif or default to gray
      }));
    });
  }
}
  