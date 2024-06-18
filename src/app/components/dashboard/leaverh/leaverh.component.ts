import { Component, Input, OnInit } from '@angular/core';
import { RhTasksService } from '../../../services/rh-tasks.service';
import { SharedModule } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
interface TaskVariables {
  leaveType: string;
  startDate: number;
  endDate: number;
  UserId: string;
}
@Component({
  selector: 'app-leaverh',
  standalone: true,
  imports: [SharedModule,CommonModule,MatGridListModule,
    MatCardModule,
    MatButtonModule,
],
  templateUrl: './leaverh.component.html',
  styleUrl: './leaverh.component.css'
})

export class LeaverhComponent implements OnInit {
  tasks: any[] = [];

  @Input()
  taskss: any[] = [];

 
  constructor(private rhTaskService:RhTasksService){}
  ngOnInit(): void {
    this.rhTaskService.getRhTasks().subscribe(
      (data: any[]) => {
        console.log('Data received:', data);
  
        this.tasks = data.map(task => {
          console.log('Parsing Variables:', task.Variables); // Ajoutez ce log pour vérifier le JSON
  
          let parsedVariables: TaskVariables;
          try {
            parsedVariables = JSON.parse(task.Variables);
          } catch (e) {
            console.error('Error parsing Variables:', e);
            return null; // Ignore les erreurs de parsing
          }
  
          return {
            taskId: task.taskId,
            leaveType: parsedVariables.leaveType,
            startDate: new Date(parsedVariables.startDate),
            endDate: new Date(parsedVariables.endDate),
            IdEmployee: parsedVariables.UserId
          };
        }).filter(Boolean); // Filtre les résultats nulls
      },
      (      error: any) => {
        console.error('Error occurred:', error);
      }
    );
  }


  approve(taskId: string) {
    if (!taskId) {
        console.error('Invalid taskId:', taskId);
        return;
    }

    this.rhTaskService.updateTaskStatus(taskId, 'approved').subscribe(
        response => console.log('Task approved:', response),
        error => console.error('Error:', error)
    );
}


  reject(taskId: string) {
    this.rhTaskService.updateTaskStatus(taskId, 'rejected').subscribe(response => {
      console.log('Task rejected:', response);
    });
  }


  
  }

