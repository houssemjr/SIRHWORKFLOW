import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../interfaces/userDTO';
import { CommonModule } from '@angular/common';
import { solde } from '../../../interfaces/solde';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
   
  user!:UserDTO;
  profileImageUrl: string = '';
  solde!:solde;


  constructor(private authService:AuthService,private userService:UserService){

  }

  ngOnInit() {
    const userId = this.authService.getLoggedInUserId();
    console.log("The user ID in the profile is " + userId);
    
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (userData) => {
          this.user = userData;
          if (this.user.attributes && this.user.attributes.profileImage && this.user.attributes.profileImage.length > 0) {
            this.profileImageUrl = this.user.attributes.profileImage[0];
          }
          console.log('User data fetched successfully:', this.user);
        },
        error: (err) => {
          console.error('Failed to fetch user:', err);
        }
      });

      // Appeler pour obtenir le solde
      this.userService.getSoldeByIdUser(userId).subscribe({
        next: (soldeData) => {
          this.solde = soldeData;
          console.log('Solde data fetched successfully:', this.solde);
        },
        error: (err) => {
          console.error('Failed to fetch solde:', err);
        }
      });
      
    }
  }
}
