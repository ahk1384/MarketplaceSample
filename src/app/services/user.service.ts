import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private USERS_KEY = 'app_users';
  private CURRENT_USER_KEY = 'current_user';

  // Get all users from localStorage
  getUsers(): User[] {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Save users to localStorage
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Check if email already exists
  emailExists(email: string): boolean {
    const users = this.getUsers();
    return users.some(u => u.email.toLowerCase() === email.toLowerCase());
  }

  // Signup - add new user
  signup(name: string, email: string, password: string): { success: boolean; message: string } {
    if (this.emailExists(email)) {
      return { success: false, message: 'Email already exists' };
    }

    const users = this.getUsers();
    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name,
      email,
      password
    };

    users.push(newUser);
    this.saveUsers(users);

    return { success: true, message: 'Signup successful' };
  }

  // Login - check credentials
  login(email: string, password: string): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      // Save current user (without password)
      const safeUser = { id: user.id, name: user.name, email: user.email };
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(safeUser));
      return { success: true, message: 'Login successful', user };
    }

    return { success: false, message: 'Invalid email or password' };
  }

  // Get current logged-in user
  getCurrentUser(): Omit<User, 'password'> | null {
    const data = localStorage.getItem(this.CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}

