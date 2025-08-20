import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashCards } from '../dash-cards/dash-cards';
import { DashTable } from '../dash-table/dash-table';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, DashCards, DashTable],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
