import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseUrl } from '../utils/base-url';
import { IImage } from './store/image/image-signals-state-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseUrl {
  private httpClient = inject(HttpClient)

  constructor() {
    super();
  }

  public getImages(): Observable<IImage[]> {
    return this.httpClient.get<IImage[]>(`${this.apiUrl}/images`);
  }
}
