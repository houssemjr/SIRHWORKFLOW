import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserCardsComponent } from '../user-cards/user-cards.component';
import { UserInfo, UserInfoService } from '../../../services/user-info.service';
import { UserformComponent } from '../userform/userform.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-gestioncollab',
  standalone: true,
  imports: [
    CommonModule,
    UserCardsComponent,
    MatCardModule,
    MatGridListModule,
    UserformComponent,
    MatIconModule
  ],
  templateUrl: './gestioncollab.component.html',
  styleUrls: ['./gestioncollab.component.css']
})
export class GestioncollabComponent implements OnInit, AfterViewInit {
  users: UserInfo[] = [];
  selectedUser: UserInfo | null = null;
  showForm: boolean = false;

  @ViewChild('cardsContainer', { static: true }) cardsContainer!: ElementRef;

  constructor(private userInfoService: UserInfoService, private authService:AuthService) { }

  ngOnInit(): void {
   console.log(this.authService.getLoggedInUsername());
    this.userInfoService.getUsers().subscribe(data => {
      this.users = data;
      if (this.users.length > 0) {
        this.selectedUser = this.users[0]; // Sélectionne le premier utilisateur par défaut
      }
    });
  }

  ngAfterViewInit() {
    this.cardsContainer.nativeElement.scrollTop = 0; // Ensure the scroll starts at the top
  }

  selectUser(user: UserInfo): void {
    this.selectedUser = user;
    this.showForm = false;
  }

  addUser(): void {
    this.showForm = true;
    this.selectedUser = null; // Hide user details when adding a new user
  }

  scrollUp(): void {
    this.cardsContainer.nativeElement.scrollBy({ top: -300, behavior: 'smooth' });
  }

  scrollDown(): void {
    this.cardsContainer.nativeElement.scrollBy({ top: 300, behavior: 'smooth' });
  }

  getUserPhotoUrl(photodeProfil: string): string {
    return photodeProfil ? `http://localhost:8884${photodeProfil}` : 'assets/default-avatar.png';
  }
}
