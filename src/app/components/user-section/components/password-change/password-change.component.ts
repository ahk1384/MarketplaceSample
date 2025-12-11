import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserService, User} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {ActiveUserService} from "../../service/active-user/active-user.service";
import {PasswordChanged, PasswordChangedStatus} from "../../models/password-changed.model";

@Component({
  selector: 'app-password-change',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.css'
})
export class PasswordChangeComponent implements OnInit {
  @Output() passwordChanged = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private activeUserService: ActiveUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(!this.userService.isLoggedIn()){
      this.router.navigate(['login']);
    }
  }

  public changePassword(oldpassword: string, newpassword: string): void {
    const user = this.activeUserService.currentUser;

    if (!user) {
      alert("User not found. Please login again.");
      return;
    }

    const passwordChange: PasswordChanged = {
      id: user.id,
      oldPassword: oldpassword,
      newPassword: newpassword,
      status: PasswordChangedStatus.STARTED
    };

    const result = this.userService.chagnePassword(passwordChange);

    if (result.success) {
      alert("Password changed successfully!");
      this.passwordChanged.emit();
      this.router.navigate(['/user']);
    } else {
      alert("Failed to change password: " + result.message);
    }
  }
}
