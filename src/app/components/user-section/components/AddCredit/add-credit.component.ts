import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AddCreditStatus, AddedCredit} from "../../models/added-credit.model";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {ActiveUserService} from "../../service/active-user/active-user.service";

@Component({
  selector: 'user-add-credit',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './add-credit.component.html',
  styleUrl: './add-credit.component.css'
})
export class AddCreditComponent implements OnInit {
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

  public AddCredit(creditAmount: number): void {
    const user = this.activeUserService.currentUser;

    if (!user) {
      alert("User not found. Please login again.");
      this.router.navigate(['/login']);
      return;
    }

    if (creditAmount <= 0) {
      alert("Please enter a valid credit amount greater than 0.");
      return;
    }

    const credit: AddedCredit = {
      id: user.id,
      amount: creditAmount,
      status: AddCreditStatus.STARTED
    };

    const result = this.userService.addCredit(credit);

    if (result.success) {
      // Update the ActiveUserService with new credit
      this.activeUserService.setUser({
        ...user,
        credit: result.newCredit
      });

      alert("Credit added successfully! New balance: " + result.newCredit);
      this.router.navigate(['/user']);
    } else {
      alert("Failed to add credit. Status: " + credit.status);
    }
  }
}
