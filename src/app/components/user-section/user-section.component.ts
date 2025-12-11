import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { ActiveUserService } from './service/active-user/active-user.service';
import { UserService } from "../../services/user.service";
import { ChangeNameComponent } from './components/change-name/change-name.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { AddCreditComponent } from './components/add-credit/add-credit.component';

@Component({
  selector: 'app-user-section',
  standalone: true,
  imports: [
    CommonModule,
    ChangeNameComponent,
    PasswordChangeComponent,
    AddCreditComponent
  ],
  templateUrl: './user-section.component.html',
  styleUrl: './user-section.component.css'
})
export class UserSectionComponent {
  // Track which panel is active
  activePanel: 'profile' | 'changeName' | 'changePassword' | 'addCredit' = 'profile';

  // Only ONE constructor with all dependencies
  constructor(
    private activeUserService: ActiveUserService,
    private userService: UserService,
    private router: Router
  ) {}

  public logout(): void {
    this.activeUserService.clearUser();
    this.router.navigate(['/login']);
  }

  public getName(): string | null {
    const user = this.activeUserService.currentUser;
    return user ? user.name : null;
  }

  public getEmail(): string | null {
    const user = this.activeUserService.currentUser;
    return user ? user.email : null;
  }

  public getCredit(): number | null {
    const user = this.activeUserService.currentUser;
    if (user) {
      return user.credit ?? null;
    }
    return null;
  }

  public showProfile(): void {
    this.activePanel = 'profile';
  }

  public showChangeName(): void {
    this.activePanel = 'changeName';
  }

  public showChangePassword(): void {
    this.activePanel = 'changePassword';
  }

  public showAddCredit(): void {
    this.activePanel = 'addCredit';
  }

  // Called when name is changed successfully
  public onNameChanged(): void {
    this.activePanel = 'profile';
  }

  // Called when password is changed successfully
  public onPasswordChanged(): void {
    this.activePanel = 'profile';
  }

  // Called when credit is added successfully
  public onCreditAdded(): void {
    this.activePanel = 'profile';
  }
}
