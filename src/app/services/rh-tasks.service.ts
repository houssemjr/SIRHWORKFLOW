import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RhTasksService {
  private apiUrl = 'http://localhost:9999/rh-a';
  private appurl ='http://localhost:9999/Rh/update-status';

constructor(private Httpclient:HttpClient){}


  getRhTasks(): Observable<any> {
    return this.Httpclient.get<any>(this.apiUrl);
  }
  updateTaskStatus(taskId: string, status: string) {
    const payload = { taskId, status };
    console.log('Sending payload:', payload); // Ajoutez cette ligne pour voir ce qui est envoyé
    return this.Httpclient.post('http://localhost:9999/Rh/update-status', payload);
}



}
