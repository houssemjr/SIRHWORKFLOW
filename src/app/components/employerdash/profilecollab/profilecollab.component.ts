import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfo, UserInfoService } from '../../../services/user-info.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-profilecollab',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './profilecollab.component.html',
  styleUrls: ['./profilecollab.component.css']
})
export class ProfilecollabComponent implements OnInit {
  user: UserInfo | null = null;
  imagePreview: string | null = null;

  constructor(private userInfoService: UserInfoService, private authService: AuthService) {}

  ngOnInit(): void {
    const username = this.authService.getLoggedInUsername();
    if (username) {
      this.userInfoService.getUserByUsername(username).subscribe(user => {
        this.user = user;
        if (user.photodeProfil) {
          this.imagePreview = 'http://localhost:8884' + user.photodeProfil;
        }
      }, error => {
        console.error('Error fetching user data', error);
      });
    }
  }
}
