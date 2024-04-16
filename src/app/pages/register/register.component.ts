import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { samePasswordValidator } from '../../validators/same-password.directive';
import { SessionService } from '../../services/session.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIcon, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [provideIcons({ bootstrapGoogle })],
})
export class RegisterComponent {
  private sessionService = inject(SessionService);
  private toastrService = inject(ToastrService);
  private router = inject(Router);

  public isLoading: boolean = false;

  public registerFormGroup = new FormGroup({
    name: new FormControl('Marcus', [Validators.required, Validators.maxLength(255)]),
    email: new FormControl('marcus@teste.com', [Validators.required, Validators.email]),
    password: new FormControl('12345678', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('12345678', [Validators.required, Validators.minLength(8)]),
    terms: new FormControl(true, [Validators.requiredTrue]),
  }, { validators: samePasswordValidator() })

  public submitRegisterForm(): void {
    if (this.registerFormGroup.invalid) {
      return;
    }

    this.isLoading = true;

    const { name, email, password } = this.registerFormGroup.value;

    if (name && email && password) {
      this.sessionService
        .register(name, email, password)
        .pipe(take(1))
        .subscribe(() => {
          this.isLoading = false;
          this.registerFormGroup.disable();
          this.toastrService.success('User registered successfully');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        })
    }
  }
}
