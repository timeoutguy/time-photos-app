import { Component, Input, OnInit } from '@angular/core';
import { IImage } from '../../../services/store/image/image-signals-state-service.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.scss'
})
export class ImageFormComponent implements OnInit {
  @Input() image!: IImage;

  public imageFormGroup = new FormGroup({
    name: new FormControl(''),
  });

  ngOnInit(): void {
    if(this.image) {
      this.imageFormGroup.get('name')?.patchValue(this.image.name);
    }
  }
}
