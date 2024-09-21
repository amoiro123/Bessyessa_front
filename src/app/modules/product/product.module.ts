import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from "../../_metronic/shared/shared.module";


@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ProductRoutingModule,
    SharedModule
]
})
export class ProductModule { }
