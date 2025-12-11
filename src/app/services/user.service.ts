import {Injectable} from '@angular/core';
import {PasswordChanged, PasswordChangedStatus} from "../components/user-section/models/password-changed.model";
import {AddCreditStatus, AddedCredit} from "../components/user-section/models/added-credit.model";
import {NameChanged, NameChangedStatus} from "../components/user-section/models/name-changed.model";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  credit?: number | 0;
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

  addCredit(credit: AddedCredit): { success: boolean; newCredit: number } {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === credit.id);

    if (userIndex !== -1) {
      if (users[userIndex].credit == null) {
        users[userIndex].credit = 0;
      }
      users[userIndex].credit! += credit.amount;
      this.saveUsers(users);
      credit.status = AddCreditStatus.CONFIRMED;

      // Also update the current user in localStorage
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === credit.id) {
        const updatedUser = { ...currentUser, credit: users[userIndex].credit };
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(updatedUser));
      }

      return { success: true, newCredit: users[userIndex].credit! };
    } else {
      credit.status = AddCreditStatus.CANCELLED;
      return { success: false, newCredit: 0 };
    }
  }

  // Update user credit directly (for purchases)
  updateUserCredit(userId: number, newCredit: number): boolean {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
      users[userIndex].credit = newCredit;
      this.saveUsers(users);
      return true;
    }
    return false;
  }

  // Signup - add new user
  signup(name: string, email: string, password: string , credit :number): { success: boolean; message: string } {
    if (this.emailExists(email)) {
      return { success: false, message: 'Email already exists' };
    }

    const users = this.getUsers();
    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name,
      email,
      password,
      credit
    };

    users.push(newUser);
    this.saveUsers(users);

    return { success: true, message: 'Signup successful' };
  }

  public chagnePassword(password :PasswordChanged): { success: boolean; message: string } {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === password.id);

    if (userIndex === -1) {
      password.status = PasswordChangedStatus.CANCELLED;
      return { success: false, message: 'User not found' };
    }

    if (users[userIndex].password !== password.oldPassword) {
      password.status =  PasswordChangedStatus.CANCELLED;
      return { success: false, message: 'Old password is incorrect' };
    }

    if (password.newPassword == null) {
      password.status =  PasswordChangedStatus.CANCELLED;
      return { success: false, message: 'Password is incorrect' };

    }else{
    users[userIndex].password = password.newPassword;
    this.saveUsers(users);
    password.status =  PasswordChangedStatus.CONFIRMED;
    return { success: true, message: 'Password changed successfully' };
    }
  }
  // Login - check credentials
  login(email: string, password: string): { success: boolean, message: string, user?: User } {
    const users = this.getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      // Save current user (including credit, without password)
      const safeUser = { id: user.id, name: user.name, email: user.email, credit: user.credit };
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
  // Change user name
  public changeName(nameChange: NameChanged): { success: boolean; message: string } {
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === nameChange.id);

    if (userIndex === -1) {
      nameChange.status = NameChangedStatus.CANCELLED;
      return { success: false, message: 'User not found' };
    }

    users[userIndex].name = nameChange.newName;
    this.saveUsers(users);
    nameChange.status = NameChangedStatus.CONFIRMED;

    // Also update the current user in localStorage
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === nameChange.id) {
      const updatedUser = { ...currentUser, name: nameChange.newName };
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }

    return { success: true, message: 'Name changed successfully' };
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
