import { Component } from '@angular/core';
import { bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [provideIcons({ bootstrapGoogle})]
})
export class LoginComponent {

}
