import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UserService, User} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {PasswordChanged, PasswordChangedStatus} from "../../../user-section/models/password-changed.model";

@Component({
  selector: 'user-password-change',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.css'
})
export class PasswordChangeComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if(!this.userService.isLoggedIn()){
      this.router.navigate(['login']);
    }
  }

  public changePassword(oldpassword: string, newpassword: string): void {
    const user = this.userService.getCurrentUser();
    if (user) {
      const passwordChange: PasswordChanged = {
        id: user.id,
        oldPassword: oldpassword,
        newPassword: newpassword,
        status: PasswordChangedStatus.STARTED
      }
      const result = this.userService.chagnePassword(passwordChange);
      alert(result.message + " {password status: " + passwordChange.status + "}");
      if (result.success) {
        this.router.navigate(['/user']);
      }
    }
  }
}
