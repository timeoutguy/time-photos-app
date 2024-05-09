import { Injectable } from '@angular/core';
import { SignalsStoreService } from '../signals-store.service';

export interface CategoriesState {
  categories: ICategory[]
}

export interface ICategory {
  id: string,
  name: string,
  userId?: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesStateService extends SignalsStoreService<CategoriesState> {
  constructor() {
    super()
  }
}
