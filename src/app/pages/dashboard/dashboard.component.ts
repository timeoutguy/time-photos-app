import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { octChevronDown } from '@ng-icons/octicons';
import { ImageCardComponent } from '../../image-card/image-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIcon, ImageCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [provideIcons({ octChevronDown})]
})
export class DashboardComponent {
  @ViewChild("searchInput") searchInput!: ElementRef;

  @HostListener('document:keydown.control.k', ['$event'])
  openModal(event: KeyboardEvent) {
    event.preventDefault();
    this.searchInput.nativeElement.focus();
  }
}
