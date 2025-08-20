import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AddProductDialog } from '../add-product-dialog/add-product-dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {}
