import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
  onSignup() {
    // Check all fields are filled
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.error = 'Please fill in all fields';
      return;
    }


    // Check passwords match
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    // Check password length
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }

    // Try to signup using the service
    const result = this.userService.signup(this.name, this.email, this.password,0);

    if (result.success) {
      this.error = '';
      alert('Signup successful! Please login.');
      this.router.navigate(['/login']);
    } else {
      this.error = result.message;
    }
  }
}
