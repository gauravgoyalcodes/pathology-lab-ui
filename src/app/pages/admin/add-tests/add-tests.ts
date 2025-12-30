import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestService } from '../../../services/test.service';
import { AddTestPayload } from '../../../models/add-test.model';

@Component({
  selector: 'app-add-test',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-tests.html',
  styleUrls: ['./add-tests.css']
})
export class AddTests implements OnInit {

  testForm!: FormGroup;
  loading = false;
  success = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private testService: TestService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.testForm = this.fb.group({
      testName: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', Validators.required],
      sampleType: ['', Validators.required],
      normalTat: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]]
    });
  }

  private resetMessages(): void {
    this.success = '';
    this.error = '';
  }

  submitTest(): void {
    this.resetMessages();
    if (this.testForm.invalid) {
      this.testForm.markAllAsTouched();
      return;
    }

   const payload: AddTestPayload[] = [this.testForm.value];
       this.loading = true;

    this.testService.addTest(payload).subscribe({
      next: () => {
        this.loading = false;
        this.success = "Test Added Succesfully";
        this.testForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.error = "Add Test Failed";
        console.error('Add doctor failed', err);
      }
    });
  }
}
