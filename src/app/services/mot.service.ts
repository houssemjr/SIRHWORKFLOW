import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface MotifDTO {
  id: number;
  titre: string;
  validite: Date;
  code: string;
  couleur: string;
  workflow: string;
  type: string;
  soldeInitial: number;
  unite: string;
  depassementAutorise: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class MotService {
  private apiUrl = 'http://localhost:9999/motif/getall';
  private appUrl = 'http://localhost:9999/motif';


  constructor(private http: HttpClient) { }

  fetchAll(): Observable<MotifDTO[]> {
    return this.http.get<MotifDTO[]>(`${this.apiUrl}/getall`);
  }

  getMotifByTitre(titre: string): Observable<MotifDTO> {
    const encodedTitre = encodeURIComponent(titre); // Encode the title to handle spaces and special characters
    return this.http.get<MotifDTO>(`${this.appUrl}/getbytitre/${encodedTitre}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

}
