import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Doctor } from '../../../models/doctor.model';
import { DoctorService } from '../../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-doctors',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './manage-doctors.html',
  styleUrl: './manage-doctors.css',
})
export class ManageDoctors implements OnInit {

  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  loadingDoctors = false;
  error = '';
  success = '';
  searchTerm: string = '';

  constructor(
    private doctorService: DoctorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  private resetMessages(): void {
    this.success = '';
    this.error = '';
  }

  private loadDoctors(): void {
    this.resetMessages();
    this.loadingDoctors = true;

    this.doctorService.getDoctors().subscribe({
      next: (res: Doctor[]) => {
        this.doctors = res;
        this.filteredDoctors = res;
        if (res == null) {
          this.success = "No Doctors Found";
          this.loadingDoctors = false;
          this.cdr.detectChanges();
        }
        this.loadingDoctors = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Failed to load doctors', err);
        this.error = "Failed to load doctors, please try again later"
        this.loadingDoctors = false;
        this.cdr.detectChanges();
      }
    });
  }

 onSearch() {
  if (!this.searchTerm.trim()) {
    this.filteredDoctors = [...this.doctors];
    return;
  }

  const term = this.searchTerm.toLowerCase().trim();
  
  this.filteredDoctors = this.doctors.filter(doc => {
    return (
      doc.doctorName?.toLowerCase().includes(term) ||
      doc.specialization?.toLowerCase().includes(term) ||
      doc.doctorId?.toString().includes(term)
    );
  });
}
}




