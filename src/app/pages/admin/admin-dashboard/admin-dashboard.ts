import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabStats } from '../../../models/lab-stats.model';
import { LabStatsService } from '../../../services/lab-stats.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  username = localStorage.getItem('username');

  stats!: LabStats;
  loading = true;

  constructor(
    private statsService: LabStatsService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;

    this.statsService.getLabStats().subscribe({
      next: (res) => {
        this.stats = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard stats', err);
        this.loading = false;
      }
    });
  }
}
