import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
export interface Motif {
  id: number;
  titre: string;
  validite: Date;
  code :string;
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
export class MotifService {

  private apiUrl = 'http://localhost:9999/motif/getall';
  private appUrl = 'http://localhost:9999/motif';


  constructor(private http: HttpClient) { }

  fetchAll(): Observable<Motif[]> {
    return this.http.get<Motif[]>(this.apiUrl);
  }
  getMotifByTitre(titre: string): Observable<Motif> {
    return this.http.get<Motif>(`${this.appUrl}/getbytitre/${titre}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

}
