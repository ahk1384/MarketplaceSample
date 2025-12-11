export enum NameChangedStatus {
  STARTED = 'STARTED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

export interface NameChanged {
  id: number;
  newName : string;
  status: NameChangedStatus;
}
