import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActiveUserService } from '../components/user-section/service/active-user/active-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private activeUserService: ActiveUserService, private router: Router) {}

  canActivate(): boolean {
    if (this.activeUserService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
