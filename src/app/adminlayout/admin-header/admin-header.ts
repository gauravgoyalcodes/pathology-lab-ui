import { Component } from '@angular/core';
import { AuthService } from '../../services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css',
})
export class AdminHeader {
  username = '';
  role = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = this.authService.getUsername() || '';
    this.role = this.authService.getRole() || '';
  }

  toHeader() {
    this.router.navigateByUrl('/admin/admin-dashboard');
  }

  allBookings() {
    this.router.navigateByUrl('/admin/all-bookings');
  }

  addDoctors() {
    this.router.navigateByUrl("/admin/add-doctors")
  }

  manageDoctors() {
    this.router.navigateByUrl("admin/manage-doctors")
  }

  addTests() {
    this.router.navigateByUrl("admin/add-tests")
  }

  manageTests() {
    this.router.navigateByUrl("admin/manage-tests")
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}

