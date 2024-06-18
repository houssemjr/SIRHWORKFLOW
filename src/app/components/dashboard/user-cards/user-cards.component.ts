import { Component } from '@angular/core';
import { UserInfo, UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [CommonModule,SharedModule,
    MatCardModule,HttpClientModule,
    MatButtonModule,MatGridListModule,MatIconModule],
  templateUrl: './user-cards.component.html',
  styleUrl: './user-cards.component.css'
})
export class UserCardsComponent {
  users: UserInfo[] = [];

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.userInfoService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  editUser(userId: number): void {
    // Logique pour éditer l'utilisateur
    console.log('Edit user with ID:', userId);
  }

  deleteUser(userId: number): void {
    // Logique pour supprimer l'utilisateur
    console.log('Delete user with ID:', userId);
  }
}
