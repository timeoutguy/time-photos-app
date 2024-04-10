import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIcon, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [provideIcons({ bootstrapGoogle })],
})
export class RegisterComponent {

}
