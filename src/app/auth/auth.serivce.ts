// typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model'; // corrected path

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBase = '/api/auth';
  private currentUser$ = new BehaviorSubject<User | null>(this.getStoredUser());

  constructor(private http: HttpClient, private router: Router) {}

  get user() {
    return this.currentUser$.asObservable();
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<User>(`${this.apiBase}/login`, credentials)
      .pipe(
        tap(user => {
          if (user?.token) {
            localStorage.setItem('auth_user', JSON.stringify(user));
            this.currentUser$.next(user);
          }
        })
      );
  }

  signup(payload: { name: string; email: string; password: string }) {
    return this.http.post<User>(`${this.apiBase}/signup`, payload)
      .pipe(
        tap(user => {
          if (user?.token) {
            localStorage.setItem('auth_user', JSON.stringify(user));
            this.currentUser$.next(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('auth_user');
    this.currentUser$.next(null);
    this.router.navigate(['/login']);
  }

  private getStoredUser(): User | null {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) as User : null;
  }

  getToken(): string | null {
    const u = this.getStoredUser();
    return u?.token ?? null;
  }
}
