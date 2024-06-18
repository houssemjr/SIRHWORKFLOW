import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveService } from '../../../services/leave.service';
import { GlobalService } from '../../../services/global.service';
import { Leave } from '../../../interfaces/leave.model';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import { AbsenceDetailsComponent } from './absence-details/absence-details.component';

@Component({
  selector: 'app-calendrier-rh',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, MatIconModule, MatDialogModule],
  templateUrl: './calendrier-rh.component.html',
  styleUrls: ['./calendrier-rh.component.css']
})
export class CalendrierRHComponent implements OnInit {
  events: any[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    events: this.events,
    eventContent: this.eventContent.bind(this)
  };

  constructor(
    private leaveService: LeaveService,
    private globalService: GlobalService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  handleDateClick(arg: any) {
    const leavesOnDate = this.events.filter(event => event.start === arg.dateStr || (event.start <= arg.dateStr && event.end >= arg.dateStr));
    this.dialog.open(AbsenceDetailsComponent, {
      width: '400px',
      data: { leaves: leavesOnDate }
    });
  }

  loadEvents() {
    this.leaveService.getall().subscribe((leaves: Leave[]) => {
      const eventPromises = leaves.map(leave =>
        this.globalService.getUsernameById(leave.idEmployee).toPromise().then(username => {
          if (username) {
            return this.globalService.getUserByUsername(username).toPromise().then(userInfo => {
              if (userInfo) {
                console.log('User Info:', userInfo); // Log user info for debugging
                return {
                  title: leave.leaveType,
                  start: new Date(leave.startDate).toISOString().split('T')[0],
                  end: new Date(leave.endDate).toISOString().split('T')[0],
                  backgroundColor: leave.motifleave?.couleur || 'gray',
                  textColor: 'white',
                  extendedProps: {
                    photo: `http://localhost:8884${userInfo.photodeProfil}`,
                    userName: userInfo.username
                  }
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

      Promise.all(eventPromises).then(events => {
        this.events = events.filter(event => event !== null);
        this.calendarOptions.events = this.events as any[];
      });
    });
  }

  eventContent(eventInfo: any, createElement: any) {
    const profilePic = document.createElement('img');
    profilePic.src = eventInfo.event.extendedProps.photo;
    console.log('Profile Pic URL:', profilePic.src); // Log profile picture URL for debugging

    profilePic.onload = () => {
      console.log('Image loaded successfully:', profilePic.src);
    };
    profilePic.onerror = () => {
      console.log('Failed to load image, using default:', profilePic.src);
      profilePic.src = 'http://localhost:4200/assets/default-avatar.png';
    };

    profilePic.style.width = '20px';
    profilePic.style.height = '20px';
    profilePic.style.borderRadius = '50%';
    profilePic.style.marginRight = '5px';

    const fragment = document.createDocumentFragment();
    fragment.appendChild(profilePic);

    return { domNodes: [fragment] };
  }
}
