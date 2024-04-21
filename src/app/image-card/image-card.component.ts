import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { octCopy, octPencil, octTrash } from '@ng-icons/octicons';
import { IImage } from '../services/store/image/image-signals-state-service.service';
import { ToastrService } from 'ngx-toastr';
import { ImageFormComponent } from '../components/modals/image-form/image-form.component';
import { ConfirmModalComponent } from '../components/modals/confirm-modal/confirm-modal.component';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [CommonModule, NgIcon, ImageFormComponent, ConfirmModalComponent],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss',
  providers: [provideIcons({ octPencil, octTrash, octCopy})]
})
export class ImageCardComponent {
  @ViewChild('editModal') editModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('deleteModal') deleteModal!: ElementRef<HTMLDialogElement>;
  @Input() image!: IImage;

  readonly toastrService = inject(ToastrService);
  readonly imageService = inject(ImageService);

  public openEditModal() {
    this.editModal.nativeElement.showModal();
  }

  public openDeleteConfirmModal() {
    this.deleteModal.nativeElement.showModal();
  }

  public copyUrlToClipboard() {
    navigator.clipboard.writeText(this.imageUrl);
    this.toastrService.success("Image URL copied to clipboard")
  }

  public deleteImage() {
    this.imageService.deleteImage(this.image.id).subscribe(() => {
      this.toastrService.success(`Image "${this.image.name}" deleted successfully!`)
    })
  }

  get imageUrl() {
    return `http://localhost:3333/${this.image.url}`
  }

  get confirmDeleteMessage() {
    return `Are you sure you want to delete the image ${this.image.name}?`
  }

  get confirmDeleteTitle() {
    return `Delete Image "${this.image.name}"`
  }
}
