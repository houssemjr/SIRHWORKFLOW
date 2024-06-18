import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotifService, Motif } from '../../../services/motif.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardColorDirective, CardBorderColorDirective } from './card-color.directive';
import { MatButtonModule } from '@angular/material/button';
import { AddmotifComponent } from '../addmotif/addmotif.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-gestionmotif',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    CardColorDirective,
    CardBorderColorDirective,
    AddmotifComponent,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './gestionmotif.component.html',
  styleUrls: ['./gestionmotif.component.css']
})
export class GestionmotifComponent implements OnInit {
  motifs: Motif[] = [];
  selectedMotif: Motif | null = null;
  showAddMotifForm: boolean = false;
  hoveredMotif: Motif | null = null; 

  constructor(private motifService: MotifService) { }

  ngOnInit(): void {
    this.motifService.fetchAll().subscribe(data => {
      this.motifs = data;
      if (this.motifs.length > 0) {
        this.selectedMotif = this.motifs[0];
      }
    });
  }

  selectMotif(motif: Motif): void {
    this.selectedMotif = motif;
    this.showAddMotifForm = false; // Hide the add form when a motif is selected
  }

  addMotif(): void {
    this.showAddMotifForm = true;
    this.selectedMotif = null; // Hide the motif details when showing the add form
  }

  disableMotif(motif: Motif): void {
    // Ajoutez ici la logique pour désactiver le motif
    console.log('Motif désactivé:', motif);
  }
}
