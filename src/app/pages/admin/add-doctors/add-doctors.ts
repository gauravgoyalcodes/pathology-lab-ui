import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { AddDoctorPayload } from '../../../models/add-doctor.payload';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-doctor',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-doctors.html',
  styleUrl: './add-doctors.css'
})
export class AddDoctor implements OnInit {
  error = '';
  success = '';
  doctorForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.doctorForm = this.fb.group({
      salutation: ['', Validators.required],
      doctorName: ['', [Validators.required, Validators.minLength(2)]],
      specialization: ['', Validators.required]
    });
  }

  private resetMessages(): void {
    this.success = '';
    this.error = '';
  }

  submitDoctor(): void {
    this.resetMessages();
    if (this.doctorForm.invalid) {
      this.doctorForm.markAllAsTouched();
      return;
    }

    const payload: AddDoctorPayload[] = [this.doctorForm.value];
    this.loading = true;

    this.doctorService.addDoctor(payload).subscribe({
      next: () => {
        this.loading = false;
        this.success = "Doctor Added Succesfully";
        this.doctorForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.error = "Add Doctor Failed";
        console.error('Add doctor failed', err);
      }
    });
  }

  get salutation() { return this.doctorForm.get('salutation'); }
  get doctorName() { return this.doctorForm.get('doctorName'); }
  get specialization() { return this.doctorForm.get('specialization'); }
}
