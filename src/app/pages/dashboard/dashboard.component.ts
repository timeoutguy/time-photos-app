import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { octChevronDown } from '@ng-icons/octicons';
import { ImageCardComponent } from '../../image-card/image-card.component';
import { ImageService } from '../../services/image.service';
import { UserSignalsStateService } from '../../services/store/user/user-signals-state.service';
import { IImage, ImageSignalsStateServiceService } from '../../services/store/image/image-signals-state-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIcon, ImageCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [provideIcons({ octChevronDown})]
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

  public images = this.imageState.select('images');
  private filter: string = '';

  ngOnInit(): void {
    this.imageService.getImages().subscribe(result => {
      this.imageState.set('images', result);
    });
  }

  public filterImages(event: Event) {
    this.filter = (event.target as HTMLInputElement).value.toLowerCase();
  }

  get filteredImages() {
    if(this.filter) return this.images().filter(image => image.name.toLowerCase().includes(this.filter))
    return this.images();
  }
}
