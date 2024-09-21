import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductModelComponent } from './components/product-model/product-model.component';

const routes: Routes = [
  {
    component: ProductModelComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
