import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserSignalsStateService } from './services/store/user/user-signals-state.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private userState = inject(UserSignalsStateService);
  private sessionService = inject(SessionService);
  title = 'time-photos-app';

  ngOnInit(): void {
    if(this.sessionService.getSessionStorage()) {
      const { user, token } = this.sessionService.getSessionStorage();

      this.userState.setState({ user, token });
    }
  }
}
