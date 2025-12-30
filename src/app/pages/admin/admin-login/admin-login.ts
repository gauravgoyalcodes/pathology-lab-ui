import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/admin-auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})

export class AdminLogin implements OnInit {
  loginForm!: FormGroup;
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])[A-Za-z0-9@$!%*?&#]{8,}$/)
      ]],
      authorized: [false, Validators.requiredTrue]
    });
  }

  // Getter to simplify access to password value in HTML
  get p(): string {
    return this.loginForm.get('password')?.value || '';
  }

  // Real-time validation helpers
  hasUpperCase(): boolean { return /[A-Z]/.test(this.p); }
  hasNumber(): boolean { return /[0-9]/.test(this.p); }
  hasSpecialChar(): boolean { return /[@$!%*?&#]/.test(this.p); }

  login() {
  if (this.loginForm.invalid || this.loading) {
    return;
  }

  this.loading = true;
  this.error = '';

  const { username, password } = this.loginForm.value;

  this.auth.login({ username, password }).subscribe({
    next: (res) => {
      // 1. Stop loading immediately on success
      this.loading = false;
      this.auth.saveAuthData(res);
      this.router.navigate(['/admin/admin-dashboard']);
    },
    error: (err) => {
      // 2. Stop loading immediately on error
      this.loading = false;
      console.error('LOGIN ERROR:', err);
      
      // Handle the error message
      if (err.status === 401) {
        this.error = 'Invalid username or password.';
      } else if (err.status === 0) {
        this.error = 'Server is unreachable. Please check your connection.';
      } else {
        this.error = err?.error?.message || 'An unexpected error occurred.';
      }

      // 3. Force Angular to refresh the UI (fixes "stuck" buttons)
      this.cdr.detectChanges();
    }
  });
}
}