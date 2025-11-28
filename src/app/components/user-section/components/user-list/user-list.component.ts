import {Component, DestroyRef, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {User} from "../../../../models/user.model";
import {PasswordChanged, PasswordChangedStatus} from "../../models/password-changed.model";
import {ActiveUserService} from "../../service/active-user/active-user.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  standalone: true,
})
export class UserListComponent implements OnInit {

  @Input()
  public users: User[] = [];

  @Input()
  public renamingUserId: string | null = null;

  @Output()
  public userSelected: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public userDeleted: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public renameAction: EventEmitter<PasswordChanged> = new EventEmitter<PasswordChanged>();

  protected activeUserId: string = '';
  protected originalName: string = '';
  protected readonly passwordChangedStatus = PasswordChangedStatus;

  public constructor(
    private readonly _activeUserService: ActiveUserService,
    private readonly _destroyRef: DestroyRef
  ) {
  }

  public ngOnInit(): void {
    this._activeUserService.activeUserId$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((userId) => {
        this.activeUserId = userId;
      });
  }

  protected onUserClick(userId: string): void {
    this.userSelected.emit(userId);
  }

  protected onUserSession(userId: string): void {
    this.userDeleted.emit(userId);
  }

  protected startRenaming(user: User): void {
    this.originalName = user.password;
    this.renameAction.emit({
      id: user.id,
      status: PasswordChangedStatus.STARTED
    });
  }

  protected confirmRenaming(user: User): void {
    this.renameAction.emit({
      id: user.id,
      newPassword: user.password,
      status: PasswordChangedStatus.CONFIRMED
    });
  }

  protected cancelRenaming(userId: string): void {
    this.renameAction.emit({
      id: userId,
      status: PasswordChangedStatus.CANCELLED
    });
  }

  protected trackByUserId(index: number, user: User): string {
    return user.id;
  }

}
