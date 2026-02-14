import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';


import { Doctor } from '../../models/doctor.model';
import { Test } from '../../models/test.model';
import { TimeSlot } from '../../models/slot.model';
import { BookingRequest } from '../../models/booking.model';

import { DoctorService } from '../../services/doctor.service';
import { TestService } from '../../services/test.service';
import { SlotService } from '../../services/slot.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './booking-page.html',
  styleUrl: './booking-page.css'
})
export class BookingPage implements OnInit {

  bookingForm!: FormGroup;

  doctors: Doctor[] = [];
  tests: Test[] = [];
  availableSlots: TimeSlot[] = [];

  minDate!: string;
  maxDate!: string;

  loadingDoctors = false;
  loadingTests = false;

  submitting = false;
  submitted = false;   // ✅ MUST EXIST (your last error)

  selectedTestDetails?: Test;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private doctorService: DoctorService,
    private testService: TestService,
    private slotService: SlotService,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDoctors();
    this.loadTests();

    this.minDate = this.slotService.getMinDate();
    this.maxDate = this.slotService.getMaxDate();
  }

  private initForm() {
    this.bookingForm = this.fb.group({
      salutation: [''],
      name: ['', Validators.required],
      age: [null, Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],

      doctor: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],

      selectedTest: [''],
      tests: [[]],
      notes: ['']
    });
  }

  // ------------------------
  // Data loading
  // ------------------------

  private loadDoctors() {
    this.loadingDoctors = true;
    this.doctorService.getDoctors().subscribe({
      next: res => {
        this.doctors = res;
        this.loadingDoctors = false;
      },
      error: () => this.loadingDoctors = false
    });
  }

  private loadTests() {
    this.loadingTests = true;
    this.testService.getTests().subscribe({
      next: res => {
        this.tests = res;
        this.loadingTests = false;
      },
      error: () => this.loadingTests = false
    });
  }

  // ------------------------
  // Slots
  // ------------------------

  onDateChange() {
    const date = new Date(this.bookingForm.value.date);
    this.availableSlots = this.slotService.getAvailableSlots(date);
    this.bookingForm.patchValue({ timeSlot: '' });
  }

  selectSlot(slot: TimeSlot) {
    this.bookingForm.patchValue({ timeSlot: slot.label });
  }

  isSelected(slot: TimeSlot): boolean {
    return this.bookingForm.value.timeSlot === slot.label;
  }

  // ------------------------
  // Tests
  // ------------------------

  onTestSelect() {
    const code = this.bookingForm.value.selectedTest;
    this.selectedTestDetails = this.tests.find(t => t.testCode === code);
  }

  addTest() {
    if (!this.selectedTestDetails) return;

    const current = this.bookingForm.value.tests as string[];
    const code = this.selectedTestDetails.testCode;

    if (!current.includes(code)) {
      this.bookingForm.patchValue({
        tests: [...current, code],
        selectedTest: ''
      });
    }

    this.selectedTestDetails = undefined;
  }

  get selectedTests(): Test[] {
    const codes = this.bookingForm.value.tests as string[];
    return this.tests.filter(t => codes.includes(t.testCode));
  }

  get totalPrice(): number {
    return this.selectedTests.reduce((sum, t) => sum + t.price, 0);
  }

  get maxTat(): string {
    if (!this.selectedTests.length) return '';
    const max = Math.max(...this.selectedTests.map(t => parseInt(t.normalTat)));
    return `${max} hours`;
  }

  removeTest(testCode: string) {
    const current = this.bookingForm.value.tests as string[];

    const updated = current.filter(code => code !== testCode);

    this.bookingForm.patchValue({
      tests: updated
    });
  }

  // ------------------------
  // SUBMIT (FINAL & CLEAN)
  // ------------------------

  submit() {
    if (this.submitting) return;

    // 🔑 Manual validation for tests
    if (!this.bookingForm.value.tests || this.bookingForm.value.tests.length === 0) {
      alert('Please select at least one test');
      return;
    }

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.submitted = false;

    const payload: BookingRequest = {
      salutation: this.bookingForm.value.salutation,
      patientName: this.bookingForm.value.name,
      age: this.bookingForm.value.age,
      gender: this.bookingForm.value.gender,
      phone: this.bookingForm.value.phone,
      email: this.bookingForm.value.email,
      appointmentDate: this.bookingForm.value.date,
      timeSlot: this.bookingForm.value.timeSlot,
      doctorId: this.bookingForm.value.doctor,
      tests: this.bookingForm.value.tests,
      totalPrice: this.totalPrice,
      maxTat: this.maxTat,
      status: 'PENDING',
      notes: this.bookingForm.value.notes
    };

    this.bookingService.createBooking(payload)
      .pipe(
        finalize(() => {
          console.log('Finalize triggered');
          this.submitting = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (res) => {
          console.log('reached on updating the submitted to true');
          this.submitted = true;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Full Error Object:', err);
        }
      });
  }

  // Add this method to handle a clean reset
  resetForm() {
    this.submitted = false;
    this.submitting = false;
    this.bookingForm.reset({
      salutation: '',
      gender: '',
      doctor: '',
      tests: [], // Reset the array specifically
      selectedTest: ''
    });
    this.availableSlots = [];
    this.selectedTestDetails = undefined;
    this.cdr.detectChanges();
  }
}
