import { ProductType } from "../Enum/ProductType";
import { ProductModel } from "./ProductModel";

export interface Brand {
    id: string;  
    name: string;
    description: string;
    productModel?: ProductModel[];  
    addedBy: string;  
  }
  