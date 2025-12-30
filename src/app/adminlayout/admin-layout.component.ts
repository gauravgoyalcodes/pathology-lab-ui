import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AdminHeader } from "./admin-header/admin-header";
import { Footer } from "../mainlayout/footer/footer";
import { AdminFooter } from "./admin-footer/admin-footer";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminHeader, AdminFooter],
  template: `
    <app-admin-header></app-admin-header>
    <router-outlet></router-outlet>
    <app-admin-footer></app-admin-footer>
  `
})
export class AdminLayoutComponent {}
