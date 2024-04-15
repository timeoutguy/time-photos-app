import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { samePasswordValidator } from '../../validators/same-password.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIcon, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [provideIcons({ bootstrapGoogle })],
})
export class RegisterComponent {
  public registerFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    terms: new FormControl(false, [Validators.requiredTrue]),
  }, { validators: samePasswordValidator() })
}
