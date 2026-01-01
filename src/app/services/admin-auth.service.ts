import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private BASE_URL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  login(payload: { username: string; password: string }) {
    return this.http.post<any>(`${this.BASE_URL}/admin/login`, payload);
  }

  saveAuthData(res: any) {
    sessionStorage.setItem('token', res.token);
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('role', res.role);
  }
  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  logout() {
    sessionStorage.clear();
  }

}
