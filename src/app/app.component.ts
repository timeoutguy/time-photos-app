import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from './services/session.service';
import { UserSignalsStateService } from './services/store/user/user-signals-state.service';
import { take } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  readonly cookieService = inject(CookieService);
  readonly userState = inject(UserSignalsStateService);
  readonly jwtHelper = inject(JwtHelperService);

  title = 'time-photos-app';

  constructor() {
    if(this.cookieService.get('token')) {
      const user = this.jwtHelper.decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImZ1bGxOYW1lIjoiTWFyY3VzIiwiZW1haWwiOiJtYXJjdXMxQHRlc3RlLmNvbSIsImlhdCI6MTcxMzQ3Njg2NCwiZXhwIjoxNzEzNTYzMjY0fQ.5BmKIT7TtNeF0Oq0Vpua1THehjzJheZU5u1GAbEVv9Q');

      this.userState.set('user', {
        fullName: user.fullName,
        email: user.email,
        id: user.userId
      });

      this.userState.set('token', {
        token: this.cookieService.get('token'),
        type: 'Bearer'
      });
    }
  }
}
