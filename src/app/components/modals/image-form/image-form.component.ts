import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IImage, ImageSignalsStateServiceService } from '../../../services/store/image/image-signals-state-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageService } from '../../../services/image.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.scss'
})
export class ImageFormComponent implements OnInit {
  private readonly imageService = inject(ImageService);
  private readonly imageState = inject(ImageSignalsStateServiceService);
  private readonly toastrService = inject(ToastrService);

  @Input() image!: IImage;

  private imageFile?: File

  public imageFormGroup = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)]}),
  });

  ngOnInit(): void {
    if(this.image) {
      this.imageFormGroup.get('name')?.patchValue(this.image.name);
    }
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.imageFile = target.files![0];
  }

  onSubmit(e: Event) {
    if(this.imageFormGroup.invalid) {
      e.preventDefault();
      return;
    };

    this.image ? this.updateImage() : this.createImage();
  }

  updateImage() {
    const data = new FormData()

    data.append('name', this.imageFormGroup.get('name')!.value);

    if(this.imageFile) data.append('image', this.imageFile!)

    this.imageService.updateImage(this.image.id, data)
    .pipe(take(1))
    .subscribe(result => {
      const images = this.imageState.select('images')

      this.imageState.setState({ images: images().map(image => image.id === this.image.id ? result : image)})
      this.toastrService.success("Image updated successfully")
    })
  }

  createImage() {

  }
}
