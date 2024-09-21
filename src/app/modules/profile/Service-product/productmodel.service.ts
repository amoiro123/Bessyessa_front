import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ProductModelService {
    private apiUrl = "http://localhost:8080/v1/product/models";
  //private baseUrl = '/v1/product/models';  // Base URL for the product model API

  constructor(private http: HttpClient) { }

 
  getAllProductModels(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiUrl);
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
