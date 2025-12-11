import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PasswordChanged, PasswordChangedStatus} from "../../models/password-changed.model";

export interface ActiveUser {
  id: number;
  name: string;
  email: string;
  credit?: number;  // Make optional with correct type
  password?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {
  private CURRENT_USER_KEY = 'current_user';
  private currentUser$ = new BehaviorSubject<ActiveUser | null>(this.getStoredUser());

  constructor() { }

  // Get current user as Observable (for components to subscribe)
  get user$(): Observable<ActiveUser | null> {
    return this.currentUser$.asObservable();
  }

  // Get current user value directly
  get currentUser(): ActiveUser | null {
    return this.currentUser$.value;
  }

  // Set the current user (call this after login)
  setUser(user: ActiveUser): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    this.currentUser$.next(user);
  }

  // Clear the current user (call this on logout)
  clearUser(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUser$.next(null);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUser$.value !== null;
  }
  // Get stored user from localStorage
  private getStoredUser(): ActiveUser | null {
    const data = localStorage.getItem(this.CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  }
}
