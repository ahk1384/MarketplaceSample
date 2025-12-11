export enum PasswordChangedStatus {
  STARTED = 'STARTED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

export interface PasswordChanged {
  id: number;
  oldPassword?: string;
  newPassword?: string;
  status: PasswordChangedStatus;
}
