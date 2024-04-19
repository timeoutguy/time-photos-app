import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octMoon, octSun, octUpload } from '@ng-icons/octicons';
import { UserSignalsStateService } from '../../services/store/user/user-signals-state.service';
import { SessionService } from '../../services/session.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [provideIcons({ octUpload, octMoon, octSun })],
})
export class NavbarComponent {
  readonly userState = inject(UserSignalsStateService);
  readonly sessionService = inject(SessionService);
  readonly cookieService = inject(CookieService);
  readonly router = inject(Router);

  user = this.userState.select('user');

  public logout() {
    this.sessionService.logout().subscribe(() => {
      this.userState.clear();
      this.cookieService.delete('token');
      this.router.navigate(['']);
    });
  }
}
