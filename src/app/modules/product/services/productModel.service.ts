import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/ProductModel';
import { environment } from 'src/environments/environment';
import { ProductModelItem } from '../models/productModelItem.model';

@Injectable({
  providedIn: 'root'
})
export class ProductModelService {
  private apiUrl = `${environment.apiUrl}product/models`;

  constructor(private http: HttpClient) { }

  getAllProductModels(): Observable<ProductModelItem[]> {
    return this.http.get<ProductModelItem[]>(this.apiUrl);
  }

  getProductModelById(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}`);
  }

  createProductModel(model: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.apiUrl, model);
  }

 
  updateProductModel(id: string, model: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.apiUrl}/${id}`, model);
  }

  
  deleteProductModel(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
