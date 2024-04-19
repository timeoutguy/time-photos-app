import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly jwtHelper = inject(JwtHelperService);
  readonly cookieService = inject(CookieService);

  public isAuthenticated() {
    const token = this.cookieService.get('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
