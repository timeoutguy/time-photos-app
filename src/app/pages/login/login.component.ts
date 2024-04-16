import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SessionService } from '../../services/session.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';

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
    .subscribe(result => {
      this.isLoading = false;
      console.log(result);
    })
  }
}
