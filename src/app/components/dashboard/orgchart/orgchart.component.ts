import { Component, OnInit } from '@angular/core';
import { UserInfo, UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-orgchart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatToolbarModule],
  templateUrl: './orgchart.component.html',
  styleUrls: ['./orgchart.component.css']
})
export class OrgchartComponent implements OnInit {

  ceo: UserInfo | undefined;
  cto: UserInfo | undefined;
  teams: { [key: string]: UserInfo[] } = {};
  showCto: boolean = false;
  showTeamsContainer: boolean = false;
  showTeams: { [key: string]: boolean } = {};

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.userInfoService.getUsers().subscribe(users => {
      users.forEach(user => {
        if (user.role && user.role.intitule === 'CEO') {
          this.ceo = user;
        } else if (user.role && user.role.intitule === 'CTO') {
          this.cto = user;
        } else if (user.equipes) {
          user.equipes.forEach(equipe => {
            if (!this.teams[equipe.titre]) {
              this.teams[equipe.titre] = [];
            }
            this.teams[equipe.titre].push(user);
          });
        }
      });
    });
  }

  toggleCto(): void {
    this.showCto = !this.showCto;
    this.showTeamsContainer = false; // Réinitialise l'affichage des équipes
  }

  toggleTeams(): void {
    this.showTeamsContainer = !this.showTeamsContainer;
  }

  toggleTeam(team: string): void {
    this.showTeams[team] = !this.showTeams[team];
  }

  getTeams(): string[] {
    return Object.keys(this.teams);
  }

  getProfileImageUrl(path: string): string {
    return 'http://localhost:8884' + path;
  }
}
