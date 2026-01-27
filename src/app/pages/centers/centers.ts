import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { CenterResponseModel } from '../../models/center-response.model';
import { CenterService } from '../../services/center.service';
@Component({
  selector: 'app-centers',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './centers.html',
  styleUrl: './centers.css',
})
export class Centers implements OnInit {
  centers: CenterResponseModel[] = [];
  filteredCenters: CenterResponseModel[] = [];

  searchTerm = '';
  loading = false;
  success = '';
  error = '';

  constructor(
    private centerService: CenterService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCenters();
  }

  private resetMessages(): void {
    this.success = '';
    this.error = '';
  }

  private loadCenters(): void {
    this.resetMessages();
    this.loading = true;

    this.centerService.getAllCenters().subscribe({
      next: (res: CenterResponseModel[]) => {
        this.centers = res;
        this.filteredCenters = res;
        if (res == null) {
          this.success = "No centers Found";
          this.loading = false;
          this.cdr.detectChanges();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Failed to load centers', err);
        this.error = "Failed to load centers, please try again later"
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(): void {
    // 🔐 Guard: data not loaded yet
    if (!this.centers || this.centers.length === 0) {
      return;
    }

    const term = (this.searchTerm || '').toLowerCase().trim();

    if (!term) {
      this.filteredCenters = this.centers;
      return;
    }

    this.filteredCenters = this.centers.filter(center =>
      center.centerName.toLowerCase().includes(term) ||
      center.city.toLowerCase().includes(term) ||
      center.state.toLowerCase().includes(term)
    );
  }

}
