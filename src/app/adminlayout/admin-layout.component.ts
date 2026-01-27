import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AdminHeader } from "./admin-header/admin-header";
import { Footer } from "../mainlayout/footer/footer";
import { AdminFooter } from "./admin-footer/admin-footer";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminHeader, AdminFooter],
  styles: [`
    .admin-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .admin-content {
      flex: 1;
    }
  `],
  template: `
    <div class="admin-layout">
      <app-admin-header></app-admin-header>

      <main class="admin-content">
        <router-outlet></router-outlet>
      </main>

      <app-admin-footer></app-admin-footer>
    </div>
  `
})
export class AdminLayoutComponent {}