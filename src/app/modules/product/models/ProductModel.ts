import { ProductType } from '../../product/enums/ProductType';
import { Brand } from './Brand';
import { Product } from './Product';

export interface ProductModel {
  id: string;  
  name: string;
  description: string;
  addedBy: string;  
  addedOn: Date;
  products?: Product[];  
  brand: Brand;  
  productType: ProductType;  
}
