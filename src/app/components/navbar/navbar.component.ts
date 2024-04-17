import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octMoon, octSun, octUpload } from '@ng-icons/octicons';
import { UserSignalsStateService } from '../../services/store/user/user-signals-state.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [provideIcons({ octUpload, octMoon, octSun })],
})
export class NavbarComponent {
  private userState = inject(UserSignalsStateService);

  user = this.userState.select('user');
}
