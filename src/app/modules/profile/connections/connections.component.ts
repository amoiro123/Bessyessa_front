import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product/services/product.service';
import { Product } from '../../product/models/Product';

// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css']
// })
// export class ProductComponent implements OnInit {

@Component({
     selector: 'app-connections',
     templateUrl: './connections.component.html',
   })
   export class ConnectionsComponent {

  products: Product[] = [];
  selectedProduct?: Product;
  newProduct: Product = { id: '', reference: '', publishedBy: '', isAvailable: true, publishedOn: new Date() };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => this.products = data,
      (error) => console.error(error)
    );
  }

  getAvailableProducts(): void {
    this.productService.getAvailableProducts().subscribe(
      (data: Product[]) => this.products = data,
      (error) => console.error(error)
    );
  }

  getProductById(id: string): void {
    this.productService.getProductById(id).subscribe(
      (data: Product) => this.selectedProduct = data,
      (error) => console.error(error)
    );
  }

  createProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(
      (data: Product) => {
        this.products.push(data);
        this.newProduct = { id: '', reference: '', publishedBy: '', isAvailable: true, publishedOn: new Date() };
      },
      (error) => console.error(error)
    );
  }

  updateProduct(id: string): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(id, this.selectedProduct).subscribe(
        (data: Product) => console.log('Product updated', data),
        (error) => console.error(error)
      );
    }
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(
      () => this.products = this.products.filter(p => p.id !== id),
      (error) => console.error(error)
    );
  }
}
