import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About {
  features = [
    {
      title: 'Add Product',
      desc: 'Add new products to the inventory',
    },
    {
      title: 'Delete',
      desc: 'Delete existing products from the system',
    },
    {
      title: 'Edit',
      desc: 'Edit product details quickly and easily',
    },
    {
      title: 'Storage',
      desc: 'All product data stored in a JSON server',
    },
    {
      title: 'State Management',
      desc: 'Data is managed using NgRx Store for state management',
    },
    {
      title: 'Dashboard',
      desc: 'Clean UI to render and manage inventory in real-time',
    },
  ];

  techStack = [
    'Angular',
    'NgRx',
    'Angular Material',
    'TypeScript',
    'JSON Server',
  ];

  roadmap = [
    'User authentication & roles',
    'Cloud backend integration',
    'Export reports (PDF/Excel)',
    'Mobile responsive enhancements',
  ];
}
