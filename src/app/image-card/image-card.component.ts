import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { octCopy, octPencil, octTrash } from '@ng-icons/octicons';
import { IImage } from '../services/store/image/image-signals-state-service.service';
import { ToastrService } from 'ngx-toastr';

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
  @Input() image!: IImage;

  readonly toastrService = inject(ToastrService);

  public openEditModal() {
    this.editModal.nativeElement.showModal();
  }

  public copyUrlToClipboard() {
    navigator.clipboard.writeText(this.imageUrl);
    this.toastrService.success("Image URL copied to clipboard")
  }

  get imageUrl() {
    return `http://localhost:3333/${this.image.url}`
  }
}
