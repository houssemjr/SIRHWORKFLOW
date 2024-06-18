import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';



@Component({
  selector: 'app-testc',
  standalone: true,
  imports: [SharedModule, RouterModule,
    MatExpansionModule,
    MatTooltipModule,MatSidenavModule,
  MatMenuModule,MatIconModule,MatDividerModule,MatListModule],
  templateUrl: './testc.component.html',
  styleUrl: './testc.component.css'
})
export class TestcComponent {

}
