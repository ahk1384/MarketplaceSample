import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {User } from "../../models/user.model";
import { Router } from "@angular/router";
import { ActiveUserService } from '../user-section/service/active-user/active-user.service';

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
  constructor(private activeUserService: ActiveUserService, private router: Router) {}
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

}
