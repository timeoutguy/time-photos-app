import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseUrl } from '../utils/base-url';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseUrl {
  private httpClient = inject(HttpClient)

  constructor() {
    super();
  }

  public getImages() {
    return this.httpClient.get(`${this.apiUrl}/images`);
  }
}
