import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserInfo {
  id: number;
  username: string;
  nom: string;
  prenom: string;
  cin: string;
  telephone: string;
  adresse: string;
  sitf: string;
  email: string;
  genre: string;
  poste: string;
  equipe: string;
  manager: string;
  role: Role;
  matricule: string;
  dateRecrutement: Date;
  diplome: string;
  seniorite: string;
  anciennete: number;
  equipes: Equipe[];
  photodeProfil: string;
}

export interface Role {
  id: number;
  intitule: string;
  description: string;
}

export interface Equipe {
  id: number;
  titre: string;
  rattachement: string;
  members: UserInfo[];
}

export interface UpdateProfileRequest {
  telephone: string;
  adresse: string;
  email: string;
  photodeProfil: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private apiUrl = 'http://localhost:8884/api/user/getinfos';
  private appUrl = 'http://localhost:8884/api/user';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(this.apiUrl);
  }

  getUserByUsername(username: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.appUrl}/byUsername/${username}`);
  }

  updateUserProfile(id: number, profileData: UpdateProfileRequest): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${this.appUrl}/updateProfile/${id}`, profileData);
  }

  uploadProfilePhoto(file: File): Observable<{ filePath: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ filePath: string }>(`${this.appUrl}/upload`, formData);
  }
}
