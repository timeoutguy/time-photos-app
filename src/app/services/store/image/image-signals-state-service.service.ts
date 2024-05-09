import { Injectable } from '@angular/core';
import { SignalsStoreService } from '../signals-store.service';
import { ICategory } from '../categories/categories-state.service';

export interface ImageState {
  images: IImage[]
}

export interface IImage {
  id: number
  name: string
  path: string
  userId: number
  createdAt: string
  updatedAt: string
  url: string
  categories: ICategory[];
}

@Injectable({
  providedIn: 'root'
})
export class ImageSignalsStateServiceService extends SignalsStoreService<ImageState> {
  constructor() {
    super();
  }
}
