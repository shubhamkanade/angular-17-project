import { ProductDetail } from './../../app/models/product-detail.model';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from '../../app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  productDetail: ProductDetail = {
    productId: 0,
    productName: '',
    category: '',
    description: '',
    reviews: '',
    standardCost: 0,
    listCost: 0,
    productPhoto: '',
    location: '',
    shelf: '',
    totalQuantity: 0
  };
  productId: number = 0;

  constructor(private http: HttpClient,
     private route: ActivatedRoute,
     private productService: ProductService,
     private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productId = +params['id'];
        this.getProducts();
      }
    });
  }

  getProducts(): void {
    this.productService.getProductDetails(this.productId).subscribe(response => {
      console.log(response)
      this.productDetail = response;
    })
  }

  getPhotoUrl(photo: string): any {
    let objectURL = 'data:image/jpeg;base64,' + photo;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
