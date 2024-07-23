export interface Product {
  productId: number;
  productNumber: String;
  productName: String;
  categoryId: number | null;
  productModelId: number |null;
  productModelName: string | null;
  categoryName: string | null;
  subCategoryName : string | null;
  subCategoryId: number | null;
  description: String;
  standardCost: number;
  listCost: number;
  productPhoto: string;
  productPhotoName: string;
}
