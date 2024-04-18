import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SessionService } from '../../services/session.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { UserSignalsStateService } from '../../services/store/user/user-signals-state.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIcon, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [provideIcons({ bootstrapGoogle})]
})
export class LoginComponent {
  private sessionService = inject(SessionService);
  private userState = inject(UserSignalsStateService);
  private toastrService = inject(ToastrService);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  public loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('marcus1@teste.com', [Validators.required]),
    password: new FormControl('12345678', [Validators.required]),
    rememberMe: new FormControl(false)
  })
  public isLoading: boolean = false;

  public login() {
    if(this.loginFormGroup.invalid) {
      return;
    }

    this.isLoading = true;

    const { email, password } = this.loginFormGroup.value;

    this.sessionService.login(email, password)
    .pipe(take(1))
    .subscribe({
      next: (result) => {
        this.userState.setState(result),
        this.cookieService.set('token', result.token.token, 30)
      },
      error: ({ error: { errors } }) => {
        errors.forEach(({ message }: any) => {
          this.toastrService.error(message)
        })
      },
      complete: () => {
        this.router.navigate(['/']);
      }
    }).add(() => this.isLoading = false);
  }
}
