import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/Brand';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  //private baseUrl = '/v1/product/brands';
  private apiUrl = `${environment.apiUrl}/product/brands`;

  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}`);
  }

  getBrandById(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/${id}`);
  }

  createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(`${this.apiUrl}`, brand);
  }

  updateBrand(id: string, brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl}/${id}`, brand);
  }

  deleteBrand(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
