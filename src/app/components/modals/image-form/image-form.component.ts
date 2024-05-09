import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IImage, ImageSignalsStateServiceService } from '../../../services/store/image/image-signals-state-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageService } from '../../../services/image.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoriesStateService, ICategory } from '../../../services/store/categories/categories-state.service';

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
  readonly categoriesState = inject(CategoriesStateService);

  @Input() image!: IImage;

  private imageFile?: File

  public imageFormGroup = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(255)]}),
  });

  public categories = this.categoriesState.select('categories');
  public selectedCategories: ICategory[] = [];

  ngOnInit(): void {
    if(this.image) {
      this.imageFormGroup.get('name')?.patchValue(this.image.name);
      this.selectedCategories = this.categories().filter(category => this.image.categories.some(imageCategory => imageCategory.id === category.id))
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

    this.selectedCategories.forEach(category => data.append('categories[]', category.id))

    this.imageService.updateImage(this.image.id, data)
    .pipe(take(1))
    .subscribe(result => {
      const images = this.imageState.select('images')

      this.imageState.setState({ images: images().map(image => image.id === this.image.id ? result : image)})
      this.toastrService.success("Image updated successfully")
    })
  }

  createImage() {
    const data = new FormData()
    data.append('name', this.imageFormGroup.get('name')!.value);

    this.selectedCategories.forEach(category => data.append('categories[]', category.id))

    if(this.imageFile) data.append('image', this.imageFile);

    this.imageService.createImage(data)
    .pipe(take(1))
    .subscribe(result => {
      const stateImages = this.imageState.select('images')

      this.imageState.setState({ images: stateImages().concat(result) })
      this.toastrService.success("Image uploaded successfully")
    })
  }

  toggleCategory(id: string) {
    if(this.selectedCategories.some(category => category.id === id)) {
      this.selectedCategories = this.selectedCategories.filter(category => category.id !== id)
      return;
    }

    this.selectedCategories.push(this.categoriesState.select('categories')().find(category => category.id === id)!)
    return;
  }

  isCategorySelected(id: string) {
    return this.selectedCategories.some(category => category.id === id)
  }
}
