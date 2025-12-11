import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PasswordChanged, PasswordChangedStatus } from "../../models/password-changed.model";

export interface ActiveUser {
  id: number;
  name: string;
  email: string;
  credit?: number;
  password?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {
  private CURRENT_USER_KEY = 'current_user';
  private currentUser$ = new BehaviorSubject<ActiveUser | null>(this.getStoredUser());

  constructor() {}

  get user$(): Observable<ActiveUser | null> {
    return this.currentUser$.asObservable();
  }

  get currentUser(): ActiveUser | null {
    return this.currentUser$.value;
  }

  setUser(user: ActiveUser): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    this.currentUser$.next(user);
  }

  clearUser(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUser$.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUser$.value !== null;
  }

  private getStoredUser(): ActiveUser | null {
    const data = localStorage.getItem(this.CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  }
}
