import { ProductModel } from "./ProductModel";

export interface Product {
  id: string;  
  reference: string;
  publishedBy: string;  
  loanedBy?: string;  
  isAvailable: boolean;
  publishedOn: Date;
  loanedOn?: Date;  
  productModel?: ProductModel;  
}
