import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { CenterResponseModel } from '../../../models/center-response.model';
import { PhleboService } from '../../../services/phlebo.service';
import { CenterService } from '../../../services/center.service';
import { PhleboRequestModel } from '../../../models/phlebo-reqeust.model';
@Component({
  selector: 'app-add-phlebos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-phlebos.html',
  styleUrl: './add-phlebos.css',
})
export class AddPhlebos implements OnInit {

  phleboForm!: FormGroup;
  centers: CenterResponseModel[] = [];  

  loading = false;
  success = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private phleboService: PhleboService,
    private centersService: CenterService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCenters();
  }

  private initForm() {
    this.phleboForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      branchName: ['', Validators.required]
    });
  }

  private loadCenters() {
    this.centersService.getAllCenters().subscribe({
      next: (data) => this.centers = data,
      error: () => this.error = 'Failed to load centers'
    });
  }

  submitPhlebo() {
    if (this.phleboForm.invalid) return;

    this.loading = true;
    this.success = '';
    this.error = '';

    const payload: PhleboRequestModel[]= [this.phleboForm.value];

    this.phleboService.registerPhlebo(payload).subscribe({
      next: () => {
        this.success = 'Phlebo registered successfully';
        this.phleboForm.reset();
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Registration failed';
        this.loading = false;
      }
    });
  }
}