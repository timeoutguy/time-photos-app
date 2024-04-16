import { Injectable, inject } from '@angular/core';
import { BaseUrl } from '../utils/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  public login(email: string, password: string): Observable<unknown> {
    return this.httpClient.post<unknown>(`${this.apiUrl}/login`, { email, password })
  }
}
