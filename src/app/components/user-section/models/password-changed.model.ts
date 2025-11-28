export enum PasswordChangedStatus {
  STARTED = 'STARTED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

export interface PasswordChanged {
  id: string;
  newPassword?: string;
  status: PasswordChangedStatus;
}
