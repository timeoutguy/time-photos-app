import { Injectable, inject } from '@angular/core';
import { BaseUrl } from '../utils/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from './store/categories/categories-state.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseUrl {
  private httpClient = inject(HttpClient);

  constructor() {
    super()
  }

  public getCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${this.apiUrl}/categories`);
  }

  public deleteCategory(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/categories/${id}`);
  }

  public updateCategory(id: number, data: ICategory): Observable<ICategory> {
    return this.httpClient.patch<ICategory>(`${this.apiUrl}/categories/${id}`, data);
  }

  public createCategory(data: ICategory) {
    return this.httpClient.post(`${this.apiUrl}/categories`, data);
  }

  public getCategory(id: number): Observable<ICategory> {
    return this.httpClient.get<ICategory>(`${this.apiUrl}/categories/${id}`);
  }
}
