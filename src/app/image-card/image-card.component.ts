import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { octCopy, octPencil, octTrash } from '@ng-icons/octicons';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss',
  providers: [provideIcons({ octPencil, octTrash, octCopy})]
})
export class ImageCardComponent {

}
