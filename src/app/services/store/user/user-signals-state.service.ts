import { Injectable } from '@angular/core';
import { SignalsStoreService } from '../signals-store.service';

export interface IUser {
  id: number
  fullName: string
  email: string
}

export interface IToken {
  type: string
  token: string
}


export interface UserState {
  user: IUser
  token: IToken
}

@Injectable({
  providedIn: 'root'
})
export class UserSignalsStateService extends SignalsStoreService<UserState> {
  constructor() {
    super()
  }
}
