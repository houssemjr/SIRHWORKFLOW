import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { UserInfoService } from '../../../services/user-info.service';

@Component({
  selector: 'app-gestionequipe',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './gestionequipe.component.html',
  styleUrls: ['./gestionequipe.component.css']
})
export class GestionequipeComponent implements OnInit {
  equipes: any[] = [];
  selectedEquipe: any = null;

  @ViewChild('cardsContainer', { static: true }) cardsContainer!: ElementRef;

  constructor(private userInfoService: UserInfoService) {}

  ngOnInit() {
    this.fetchEquipes();
  }

  fetchEquipes(): void {
    this.userInfoService.getUsers().subscribe(data => {
      const equipeMap: { [key: string]: any } = {};

      data.forEach(user => {
        user.equipes.forEach(equipe => {
          if (!equipeMap[equipe.titre]) {
            equipeMap[equipe.titre] = {
              titre: equipe.titre,
              rattachement: equipe.rattachement,
              members: []
            };
          }
          equipeMap[equipe.titre].members.push(user);
        });
      });

      this.equipes = Object.values(equipeMap);
      if (this.equipes.length > 0) {
        this.selectEquipe(this.equipes[0]);
      }
    });
  }

  selectEquipe(equipe: any): void {
    this.selectedEquipe = equipe;
  }

  scrollLeft(): void {
    this.cardsContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.cardsContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  getUserPhotoUrl(photodeProfil: string): string {
    const url = photodeProfil ? `http://localhost:8884${photodeProfil}` : 'assets/default-avatar.png';
    console.log(`Photo URL: ${url}`); // Log the URL to the console
    return url;
  }
}
