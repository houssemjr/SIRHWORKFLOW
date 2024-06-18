import { Component } from '@angular/core';
import { UpdateProfileComponent } from '../../employerdash/updateprofile/updateprofile.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-managerupdate',
  standalone: true,
  imports: [UpdateProfileComponent,CommonModule,RouterOutlet],
  templateUrl: './managerupdate.component.html',
  styleUrl: './managerupdate.component.css'
})
export class ManagerupdateComponent {

}
