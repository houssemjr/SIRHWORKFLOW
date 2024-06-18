import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateProfileRequest, UserInfo, UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-updateprofile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: UserInfo | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private userInfoService: UserInfoService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      photodeProfil: [''],
      username: [{ value: '', disabled: true }],
      nom: [{ value: '', disabled: true }],
      prenom: [{ value: '', disabled: true }],
      cin: [{ value: '', disabled: true }],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      sitf: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      genre: [{ value: '', disabled: true }],
      poste: [{ value: '', disabled: true }],
      equipe: [{ value: '', disabled: true }],
      manager: [{ value: '', disabled: true }],
      matricule: [{ value: '', disabled: true }],
      dateRecrutement: [{ value: '', disabled: true }],
      diplome: [{ value: '', disabled: true }],
      seniorite: [{ value: '', disabled: true }],
      anciennete: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    const username = this.authService.getLoggedInUsername();
    if (username) {
      this.userInfoService.getUserByUsername(username).subscribe(user => {
        this.user = user;
        this.profileForm.patchValue(user);
        if (user.photodeProfil) {
          this.imagePreview = 'http://localhost:8884' + user.photodeProfil;
        }
      }, error => {
        console.error('Error fetching user data', error);
      });
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.profileForm.patchValue({ photodeProfil: this.imagePreview });
    };
    reader.readAsDataURL(file);

    this.userInfoService.uploadProfilePhoto(file).subscribe(response => {
      this.profileForm.patchValue({ photodeProfil: response.filePath });
    }, error => {
      console.error('Error uploading file', error);
      this.snackBar.open('Error uploading file: ' + error.message, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar']
      });
    });
  }

  updateProfile(): void {
    if (this.profileForm.valid && this.user) {
      const updateRequest: UpdateProfileRequest = this.profileForm.value;
      this.userInfoService.updateUserProfile(this.user.id, updateRequest).subscribe(response => {
        console.log('Profile updated successfully', response);
        this.snackBar.open('Profile updated successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['success-snackbar']
        });
      }, error => {
        console.error('Error updating profile', error);
        this.snackBar.open('Error updating profile: ' + error.message, 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar']
        });
      });
    }
  }
}
