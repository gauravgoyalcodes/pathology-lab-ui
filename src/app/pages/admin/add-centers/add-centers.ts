import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CenterService } from '../../../services/center.service';
import { CenterRequestModel } from '../../../models/centre-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-center',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-centers.html',
  styleUrl: './add-centers.css'
})
export class AddCenters implements OnInit {

  centerForm!: FormGroup;
  loading = false;
  success = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private centerService: CenterService
  ) {}

  ngOnInit(): void {
    this.centerForm = this.fb.group({
      centerName: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitCenter(): void {
    if (this.centerForm.invalid) {
      this.centerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.success = '';
    this.error = '';

    const payload: CenterRequestModel = this.centerForm.getRawValue();

    this.centerService.registerCenter(payload).subscribe({
      next: () => {
        this.success = 'Center registered successfully';
        this.centerForm.reset();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Failed to register center';
        
      }
    });
  }
}
