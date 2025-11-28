import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseApiService} from '../base-api/base-api.service';
import {User} from "../../models/user.model";


@Injectable()
export class UserApiService {
  private readonly basePath = 'api/user';

  constructor(private readonly apiService: BaseApiService) {}

  public getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(`${this.basePath}/get_users`);
  }

  public updateUserPassword(payload: {
    username: string;
    password: string;
  }): Observable<void> {
    return this.apiService.post(`${this.basePath}/update_user_password`, payload);
  }

  public deleteUser(username: string): Observable<void> {
    return this.apiService.delete(`${this.basePath}/delete_username`, { username: username });
  }
}
