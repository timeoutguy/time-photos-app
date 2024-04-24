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

  public deleteImage(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/images/${id}`);
  }

  public updateImage(id: number, data: FormData): Observable<IImage> {
    return this.httpClient.patch<IImage>(`${this.apiUrl}/images/${id}`, data);
  }

  public createImage(data: FormData): Observable<IImage> {
    return this.httpClient.post<IImage>(`${this.apiUrl}/images`, data);
  }
}
