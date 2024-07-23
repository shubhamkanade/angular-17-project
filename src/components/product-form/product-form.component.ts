import { CategoryService } from './../../app/services/category.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProductCategory } from '../../app/models/product-category.model';
import { ProductSubCategory } from '../../app/models/product-subcategory.model';
import { ProductModel } from '../../app/models/product-model.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor] ,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',

})
export class ProductFormComponent {
  productForm: FormGroup;
  categories: ProductCategory[] = [];
  subCategories: ProductSubCategory[] = [];
  productModels: ProductModel[] = [];
  productId: number | null = null;
  selectedFile: File | null = null;
  imageUrl: string = "";
  imageName: string = "";


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.productForm = this.fb.group({
      productName: [, Validators.required],
      categoryId: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      description: ['', Validators.required],
      productNumber: ['', Validators.required],
      standardCost: ['', [Validators.required, Validators.min(0)]],
      listCost: ['', [Validators.required, Validators.min(0)]],
      productPhoto: [''],
      productId: [''],
      productModelId: ['']
    });

    //   this.productForm = this.fb.group({
    //     productName: [''],
    //     categoryId: [''],
    //     description: [''],
    //     standardCost: [''],
    //     standardCost: [''],
    //     listCost: [''],
    //     productPhotoUrl: ['']
    // });

  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProductModel();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productId = +params['id'];
        this.loadProduct();
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      console.log(categories);

      this.categories = categories;
    });
  }

  handleGetProductSubCategory(event: any): void {
    this.categoryService.getSubCategories(event.target.value).subscribe(result => {
      this.subCategories = result;

    });
  }

  loadProduct(): void {
    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe(product => {
        this.productForm.patchValue({
          productName: product.productName,
          subCategoryId: product.subCategoryId,
          categoryId: product.categoryId,
          productModelId: product.productModelId,
          productNumber : product.productNumber,
          description: product.description,
          standardCost: product.standardCost,
          listCost: product.listCost
        });

        if (typeof product.categoryId === 'number') {
          this.categoryService.getSubCategories(product.categoryId).subscribe(subCategories => {
            this.subCategories = subCategories;
            this.productForm.patchValue({ subCategoryId: product.subCategoryId });
          });
        }

        if (product.productPhoto) {
          this.imageUrl = `data:image/jpeg;base64,${product.productPhoto}`;
          this.imageName = product.productPhotoName;
      }
      });
    }
  }

  loadProductModel() : void{
    this.productService.getProductModels().subscribe(response => {
      this.productModels = response;
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
    }

    this.productForm.patchValue({
      productPhoto: file
    });
  }

  save() {
    console.log("hello world");
    if (this.productForm.valid) {
      const productNumber = this.productForm.get('productNumber')?.value;
      const formData = new FormData();

      formData.append('productName', this.productForm.get('productName')?.value);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('subCategoryId', this.productForm.get('subCategoryId')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('productNumber', this.productForm.get('productNumber')?.value);
      formData.append('standardCost', this.productForm.get('standardCost')?.value);
      formData.append('listCost', this.productForm.get('listCost')?.value);
      formData.append('productModelId', this.productForm.get('productModelId')?.value);

      formData.append('productPhoto', this.productForm.get('productPhoto')?.value);

      if (this.productId) {
        this.productService.updateProduct(this.productId, formData).subscribe(() => {
          this.toastr.success(`Product Number : ${productNumber}`, 'Product was updated successfully');
          setTimeout(() => {
            this.router.navigate(['']);
        }, 3000);
        });
      } else {
        this.productService.createProduct(formData).subscribe(() => {
          this.toastr.success(`Product Number :  ${productNumber}`, 'Product was added successfully');
          setTimeout(() => {
            this.router.navigate(['']);
        }, 3000);
        });
      }
    }
  }
}
