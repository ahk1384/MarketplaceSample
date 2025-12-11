import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ItemSectionComponent } from './components/item-section/item-section.component';
import { UserSectionComponent } from "./components/user-section/user-section.component";
import { PasswordChangeComponent } from "./components/user-section/components/password-change/password-change.component";
import { AddCreditComponent } from "./components/user-section/components/add-credit/add-credit.component";
import { ChangeNameComponent } from "./components/user-section/components/change-name/change-name.component";
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: ItemSectionComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserSectionComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: PasswordChangeComponent, canActivate: [AuthGuard] },
  { path: 'add-credit', component: AddCreditComponent, canActivate: [AuthGuard] },
  { path: 'change-name', component: ChangeNameComponent, canActivate: [AuthGuard] }
];
