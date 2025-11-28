import {Component, DestroyRef, EventEmitter, Output} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PasswordChanged, PasswordChangedStatus} from "../user-list/models/password-changed.model";
import {User} from "../../models/user.model";
import {UserApiService} from "../../services/user-api/user-api.service";
import {NzMessageService} from 'ng-zorro-antd/message';
import {UserListComponent} from "./components/user-list/user-list.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    UserListComponent
  ],
  templateUrl: './users-section.component.html',
  styleUrl: './users-section.component.scss'
})
export class UsersSectionComponent {
  @Output()
  public userSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public newUserCreated: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public userDeleted: EventEmitter<void> = new EventEmitter<void>();

  protected users: User[] = [];

  protected renamingUserId: string | null = null;
  protected isDeleteModalVisible: boolean = false;
  protected userToDelete: string | null = null;


  public constructor(
    private readonly _userApiService: UserApiService,
    private readonly _message: NzMessageService,
    private readonly _destroyRef: DestroyRef
  ) {
  }

  public ngOnInit(): void {
    this._userApiService.getUsers()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  protected onUserClick(userId: string): void {
    this.userSelected.emit(userId);
  }

  protected onNewUserClick(): void {
    this.newUserCreated.emit();
  }

  protected onDeleteUser(userId: string): void {
    this.userToDelete = userId;
    this.isDeleteModalVisible = true;
  }

  protected handleDeleteConfirm(): void {
    if (this.userToDelete) {
      this._userApiService.deleteUser(this.userToDelete).subscribe({
        next: () => {
          this.isDeleteModalVisible = false;
          this._message.success('کاربر با موفقیت حذف شد');
          this.userDeleted.emit();

        },
        error: (err) => {
          console.error('Delete User error:', err);
          this._message.error('خطا در حذف کاربر');
          this.isDeleteModalVisible = false;
          this.userToDelete = null;
        }
      });
    }

  }

  protected handleDeleteCancel(): void {
    this.isDeleteModalVisible = false;
    this.userToDelete = null;
  }

  protected onRenameAction(event: PasswordChanged): void {
    switch (event.status) {
      case PasswordChangedStatus.STARTED:
        this.renamingUserId = event.id;
        break;
      case PasswordChangedStatus.CONFIRMED:
        if (event.newPassword) {
          this._userApiService.updateUserPassword({username: event.id, password: event.newPassword});
        }
        this.renamingUserId = null;
        break;
      case PasswordChangedStatus.CANCELLED:
        this.renamingUserId = null;
        break;
    }
  }
}
