import { Product } from "./product.model";

export interface PaginatedProduct {
  products: Product[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
}
