import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IImage } from '../../../services/store/image/image-signals-state-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.scss'
})
export class ImageFormComponent implements OnInit {
  private readonly imageService = inject(ImageService);

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

    this.imageService.updateImage(this.image.id, data).subscribe(result => {
      console.log(result);
    })
  }

  createImage() {

  }
}
