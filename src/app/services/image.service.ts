import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BaseUrl } from '../utils/base-url';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseUrl {
  private httpClinet = inject(HttpClient)

  constructor() {
    super();
  }

  public getImages() {
    return this.httpClinet.get(`${this.apiUrl}/images`);
  }
}
