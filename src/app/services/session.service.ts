import { Injectable, inject } from '@angular/core';
import { BaseUrl } from '../utils/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IToken, IUser, UserState } from './store/user/user-signals-state.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseUrl {

  private readonly httpClient = inject(HttpClient);

  constructor() {
    super()
  }

  public register(name: string, email: string, password: string): Observable<unknown> {
    return this.httpClient.post<unknown>(`${this.apiUrl}/users/register`, {fullName: name, email, password })
  }

  public login(email: string, password: string): Observable<UserState> {
    return this.httpClient.post<UserState>(`${this.apiUrl}/login`, { email, password })
  }

  public setSessionStorage(user: IUser, token: IToken) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  public getSessionStorage(): { user: IUser, token: IToken } {
    return {
      user: JSON.parse(sessionStorage.getItem('user') || '{}'),
      token: JSON.parse(sessionStorage.getItem('token') || '{}')
    }
  }
}
