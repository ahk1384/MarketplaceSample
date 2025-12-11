import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserService } from "../../../../services/user.service";
import { Router } from "@angular/router";
import { ActiveUserService } from "../../service/active-user/active-user.service";
import { NameChanged, NameChangedStatus } from "../../models/name-changed.model";

@Component({
  selector: 'app-change-name',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './change-name.component.html',
  styleUrl: './change-name.component.css'
})
export class ChangeNameComponent implements OnInit {
  @Output() nameChanged = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private activeUserService: ActiveUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.activeUserService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  public changeName(newName: string): void {
    const user = this.activeUserService.currentUser;

    if (!user) {
      alert("User not found. Please login again.");
      this.router.navigate(['/login']);
      return;
    }

    if (!newName || newName.trim() === '') {
      alert("Please enter a valid name.");
      return;
    }

    const nameChange: NameChanged = {
      id: user.id,
      newName: newName.trim(),
      status: NameChangedStatus.STARTED
    };

    const result = this.userService.changeName(nameChange);

    if (result.success) {
      // Update the ActiveUserService with new name
      this.activeUserService.setUser({
        ...user,
        name: nameChange.newName
      });

      alert("Name changed successfully!");
      this.nameChanged.emit();
      this.router.navigate(['/user']);
    } else {
      alert("Failed to change name: " + result.message);
    }
  }
}
