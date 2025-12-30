import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BookingPage } from './pages/booking-page/booking-page';
import { About } from './pages/about/about';
import { ContactUs } from './pages/contact-us/contact-us';
import { Services } from './pages/services/services';
import { Gallery } from './pages/gallery/gallery';
import { AdminLogin } from './pages/admin/admin-login/admin-login';
import { EmployeeLogin } from './pages/employee/employee-login/employee-login';
import { MainLayoutComponent } from './mainlayout/main-layout.component';
import { AdminLayoutComponent } from './adminlayout/admin-layout.component';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AllBookings } from './pages/admin/all-bookings/all-bookings';
import { AddDoctor } from './pages/admin/add-doctors/add-doctors';
import { ManageDoctors } from './pages/admin/manage-doctors/manage-doctors';
import { AddTests } from './pages/admin/add-tests/add-tests';
import { ManageTests } from './pages/admin/manage-tests/manage-tests';

export const routes: Routes = [

  // 🌐 Public pages
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: Home },
      { path: 'book-appointment', component: BookingPage },
      { path: 'about', component: About },
      { path: 'contact-us', component: ContactUs },
      { path: 'services', component: Services },
      { path: 'gallery', component: Gallery },
      { path: 'admin-login', component: AdminLogin },
      { path: 'employee-login', component: EmployeeLogin }
    ]
  },

  // Admin Headers
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'admin-dashboard', component: AdminDashboard },
      { path: 'all-bookings', component: AllBookings  },
      { path: 'add-doctors', component: AddDoctor  },
      { path: 'manage-doctors', component: ManageDoctors},
      { path: 'add-tests', component: AddTests},
      { path: 'manage-tests', component: ManageTests}
    ]
  }

];

