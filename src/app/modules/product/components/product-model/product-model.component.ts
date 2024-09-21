import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductModelService } from '../../services/productModel.service';
import { ProductModelItem } from '../../models/productModelItem.model';

@Component({
  selector: 'app-product-model',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-model.component.html',
  styleUrl: './product-model.component.scss'
})
export class ProductModelComponent implements OnInit {
  list: ProductModelItem[] = []

  constructor(public modelsService: ProductModelService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.modelsService.getAllProductModels()
    .subscribe(
      {
        next: (data) => {
          console.table(data);
          this.list = data ?? [];
          this.cdr.detectChanges(); // Manually trigger change detection
        }
      }
    )  
  }
}
