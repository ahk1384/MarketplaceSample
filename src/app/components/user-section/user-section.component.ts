import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { ActiveUserService } from './service/active-user/active-user.service';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-section',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-section.component.html',
  styleUrl: './user-section.component.css'
})
export class UserSectionComponent {
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
      console.log("User credit: " + user.credit);
      return user.credit ?? null;
    }
    return null;
  }

  public changePassword(): void {
    this.router.navigate(['/change-password']);
  }

  public addCredit(): void {
    this.router.navigate(['/add-credit']);
  }

  public changeName(): void {
    this.router.navigate(['/change-name']);
  }
}
