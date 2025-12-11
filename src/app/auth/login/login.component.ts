import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ActiveUserService } from '../../components/user-section/service/active-user/active-user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';

  constructor(
    private userService: UserService,
    private activeUserService: ActiveUserService,
    private router: Router
  ) {}

  ngOnInit() {
    // If already logged in, redirect to dashboard
    if (this.activeUserService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    // Try to login using the service
    const result = this.userService.login(this.email, this.password);

    if (result.success && result.user) {
      this.error = '';
      // Store current user in ActiveUserService
      this.activeUserService.setUser({
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        credit : result.user.credit
      });
      // Navigate to dashboard after successful login
      this.router.navigate(['/dashboard']);
    } else {
      this.error = result.message;
    }
  }
}
