export enum AddCreditStatus {
  STARTED = 'STARTED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

export interface AddedCredit {
  id: number;
  amount : number;
  status: AddCreditStatus;
}
