import { Component, Input, OnInit } from '@angular/core';
import { PermissionsService } from '../../../services/permissions.service';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from 'primeng/api';
import { MatCardModule } from '@angular/material/card';
import { PermissDto } from '../../../interfaces/permissionsDto';
import { UserService } from '../../../services/user.service';
import { switchMap, forkJoin, catchError, of, Observable, map } from 'rxjs';
interface TaskData {
  Variables: string;  // Ajustez cette définition selon la structure réelle des données de tâche
  taskId: string;
}

interface TaskVariables {
  PermissionRequest: {
    motif: string;
    message: string;
    datepermission: number;
    IdEmployee: string;
  }
}

@Component({
  selector: 'app-permiss',
  standalone: true,
  imports: [SharedModule,CommonModule,MatGridListModule,MatCardModule],
  templateUrl: './permiss.component.html',
  styleUrl: './permiss.component.css'
})
export class PermissComponent implements OnInit {
  tasked: any[] = []; 

  
  taskss: (PermissDto | null)[] = []; // Accepte aussi null maintenant

  constructor(private permissionServic:PermissionsService,private userService:UserService){}
  ngOnInit(): void {
    this.permissionServic.getRhTasks().pipe(
      switchMap((data: any[]) => {
        // Transformer chaque tâche en un Observable qui inclut les données de l'utilisateur
        return forkJoin(data.map(task => this.processTask(task))).pipe(
          catchError(error => {
            console.error('Error processing tasks:', error);
            return of([]);
          })
        );
      })
    ).subscribe((tasksWithUsers: (PermissDto | null)[]) => {
      this.taskss = tasksWithUsers;
      console.log('Tasks with user details:', this.taskss);
    });
  }

  private processTask(task: any): Observable<PermissDto | null> {
    try {
      const taskData = JSON.parse(task.Variables);

      if (!taskData || !taskData.PermissionRequest) {
        console.error('Invalid task data structure:', taskData);
        return of(null);
      }

      const { motif, message, datepermission, IdEmployee,nombreheures } = taskData.PermissionRequest;
      
      // Obtenir les données de l'utilisateur pour chaque IdEmployee
      return this.userService.getUserById(IdEmployee).pipe(
        map(user => ({
          taskId: task.taskId,
          motif: motif,
          datepermission: new Date(datepermission),
          message: message,
          nombreheures:nombreheures,
          IdEmployee: IdEmployee,
          user: {
            lastname: user.lastName,
            username: user.username
          }
        })),
        catchError(error => {
          console.error(`Error fetching user details for ID ${IdEmployee}`, error);
          return of(null);
        })
      );
    } catch (e) {
      console.error('Error parsing Variables:', e);
      return of(null);
    }
  }

  approveTask(taskId: string) {
    this.permissionServic.approvePermission(taskId).subscribe({
      next: () => {
        console.log('Permission approuvée');
        // Optionnel : Mettre à jour la liste des tâches ou notifier l'utilisateur
        this.refreshTasks();
      },
      error: (error) => {
        console.error('Erreur lors de l\'approbation:', error);
      }
    });
  }
  
  
  refreshTasks() {
    this.ngOnInit(); // Recharger les tâches
  }


  rejectTask(taskId: string) {
    this.permissionServic.RejectPermission(taskId).subscribe({
      next: () => {
        console.log('Permission approuvée');
        // Optionnel : Mettre à jour la liste des tâches ou notifier l'utilisateur
        this.refreshTasks();
      },
      error: (error) => {
        console.error('Erreur lors de l\'approbation:', error);
      }
    });



}

}
