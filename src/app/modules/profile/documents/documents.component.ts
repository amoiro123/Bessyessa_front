import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../product/models/ProductModel';
import { ProductModelService } from '../../product/services/productmodel.service';

/*@Component({
  selector: 'app-product-model',
  templateUrl: './product-model.component.html',
  styleUrls: ['./product-model.component.css']
})
export class ProductModelComponent implements OnInit {*/

 @Component({
   selector: 'app-documents',
   templateUrl: './documents.component.html',
 })
 export class DocumentsComponent {

  productModels: ProductModel[] = [];
  selectedProductModel?: ProductModel;
  
  constructor(private productModelService: ProductModelService) { }

  ngOnInit(): void {
    this.getAllProductModels();
  }

  // Fetch all product models
  getAllProductModels(): void {
    this.productModelService.getAllProductModels().subscribe(
      (models) => this.productModels = models,
      (error) => console.error('Failed to fetch product models', error)
    );
  }

  // Select a product model for editing
  selectProductModel(model: ProductModel): void {
    this.selectedProductModel = model;
  }

  // Create a new product model
  createProductModel(model: ProductModel): void {
    this.productModelService.createProductModel(model).subscribe(
      (newModel) => {
        this.productModels.push(newModel);
        this.selectedProductModel = undefined;
      },
      (error) => console.error('Failed to create product model', error)
    );
  }

  // Update the selected product model
  updateProductModel(): void {
    if (this.selectedProductModel) {
      this.productModelService.updateProductModel(this.selectedProductModel.id, this.selectedProductModel).subscribe(
        (updatedModel) => {
          const index = this.productModels.findIndex(m => m.id === updatedModel.id);
          this.productModels[index] = updatedModel;
          this.selectedProductModel = undefined;
        },
        (error) => console.error('Failed to update product model', error)
      );
    }
  }

  // Delete a product model
  deleteProductModel(id: string): void {
    this.productModelService.deleteProductModel(id).subscribe(
      () => {
        this.productModels = this.productModels.filter(m => m.id !== id);
      },
      (error) => console.error('Failed to delete product model', error)
    );
  }
}
