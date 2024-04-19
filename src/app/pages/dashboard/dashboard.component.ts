import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { octChevronDown } from '@ng-icons/octicons';
import { ImageCardComponent } from '../../image-card/image-card.component';
import { ImageService } from '../../services/image.service';
import { UserSignalsStateService } from '../../services/store/user/user-signals-state.service';

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

  private imageService = inject(ImageService);
  private userState = inject(UserSignalsStateService);

  ngOnInit(): void {
    this.imageService.getImages().subscribe(result => console.log(result));
  }
}
