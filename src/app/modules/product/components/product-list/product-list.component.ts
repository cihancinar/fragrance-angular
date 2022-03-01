import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'brand', 'name', 'image', 'ref', 'description', 'created', 'updated', 'option'];
  dataSource: Product[] = [];
  loading: boolean = false;
  errorMessage: string = "";

  constructor(private productService: ProductService) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.loading = true;
    this.errorMessage = "";
    this.productService.getProducts()
      .subscribe(
        (resp) => {
          this.dataSource = resp;
          this.loading = false;
        },
        (error => {
          this.errorMessage = error;
          this.loading = false;
        })
      );
  }

  delete(id: any) {
    this.loading = true;
    this.errorMessage = "";
    this.productService.deleteProduct(id)
      .subscribe(
        (resp) => {
          this.loading = false;
          this.ngOnInit();
        },
        (error => {
          this.errorMessage = error;
          this.loading = false;
          this.ngOnInit();
        })
      );
  }

  viewImage(image: File) {
    return 'data:image/jpeg;base64,' + image;
  }
}
