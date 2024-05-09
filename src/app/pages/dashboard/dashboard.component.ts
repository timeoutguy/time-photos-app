import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { octChevronDown, octPencil, octPlusCircle, octTrash } from '@ng-icons/octicons';
import { ImageCardComponent } from '../../image-card/image-card.component';
import { ImageService } from '../../services/image.service';
import { UserSignalsStateService } from '../../services/store/user/user-signals-state.service';
import { IImage, ImageSignalsStateServiceService } from '../../services/store/image/image-signals-state-service.service';
import { CategoriesService } from '../../services/categories.service';
import { CategoriesStateService } from '../../services/store/categories/categories-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIcon, ImageCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [provideIcons({ octChevronDown, octPlusCircle, octPencil, octTrash })]
})
export class DashboardComponent implements OnInit {
  @ViewChild("searchInput") searchInput!: ElementRef;

  @HostListener('document:keydown.control.k', ['$event'])
  openModal(event: KeyboardEvent) {
    event.preventDefault();
    this.searchInput.nativeElement.focus();
  }

  readonly imageService = inject(ImageService);
  readonly imageState = inject(ImageSignalsStateServiceService);

  readonly categoriesService = inject(CategoriesService);
  readonly categoriesState = inject(CategoriesStateService);

  public images = this.imageState.select('images');
  public categories = this.categoriesState.select('categories');
  public categoriesFilter: string[] = [];
  private filter: string = '';

  ngOnInit(): void {
    this.imageService.getImages().subscribe(result => {
      this.imageState.set('images', result);
    });

    this.categoriesService.getCategories().subscribe(result => {
      this.categoriesState.set('categories', result);
    })
  }

  public filterImages(event: Event) {
    this.filter = (event.target as HTMLInputElement).value.toLowerCase();
  }

  public toggleCategoriesFilter(categoryId: string) {
    if(this.categoriesFilter.includes(categoryId)) {
      this.categoriesFilter = this.categoriesFilter.filter(c => c !== categoryId);
    } else {
      this.categoriesFilter.push(categoryId);
    }
  }

  /**
   * Gets the filtered images based on the filter and categories filter.
   * If a filter is provided, it filters the images by their name and categories.
   * If no filter is provided, it returns all the images.
   * @returns An array of filtered images.
   */
  get filteredImages() {
    if(this.filter) {
      return this.images().filter(image =>
        image.name.toLowerCase().includes(this.filter) &&
        (this.categoriesFilter.length === 0 || image.categories.some(c => this.categoriesFilter.includes(c.id))));
    }

    if (this.categoriesFilter.length > 0) {
      return this.images().filter(image => image.categories.some(c => this.categoriesFilter.includes(c.id)));
    }

    return this.images();
  }
}
