import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LabStats } from '../../../models/lab-stats.model';
import { LabStatsService } from '../../../services/lab-stats.service';
import { interval, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit, OnDestroy {

  username: string | null = localStorage.getItem('username');

  stats!: LabStats;
  loading = true;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private statsService: LabStatsService,
    private cdr: ChangeDetectorRef   // 🔥 IMPORTANT
  ) {}

  ngOnInit(): void {
    interval(30000)
      .pipe(
        startWith(0),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadStats();
      });
  }

  loadStats(): void {
    this.loading = true;

    this.statsService.getLabStats().subscribe({
      next: (res: LabStats) => {
        this.stats = res;
        this.loading = false;

        // 🔥 FORCE UI UPDATE
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load dashboard stats', err);
        this.error = 'Unable to load dashboard statistics';
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
