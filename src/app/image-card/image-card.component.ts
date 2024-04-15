import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { octCopy, octPencil, octTrash } from '@ng-icons/octicons';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss',
  providers: [provideIcons({ octPencil, octTrash, octCopy})]
})
export class ImageCardComponent {
  @ViewChild('editModal') editModal!: ElementRef<HTMLDialogElement>;

  openEditModal() {
    this.editModal.nativeElement.showModal();
  }
}
