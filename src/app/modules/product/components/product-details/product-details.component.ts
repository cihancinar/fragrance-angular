import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  dataSource!: Product;
  loading: boolean = false;
  errorMessage: string = "";

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');

    this.loading = true;
    this.errorMessage = "";
    this.productService.getProduct(productId)
      .subscribe({
        next: (resp) => {
          this.dataSource = resp;
          this.loading = false;
        },
        error: (error => {
          this.errorMessage = error;
          this.loading = false;
        })
      });
  }

  list(): void {
    this.router.navigate(['product']);
  }

  delete() {
    const productId = this.route.snapshot.paramMap.get('productId');

    this.productService.deleteProduct(productId)
      .subscribe({
        next: () => {
          this._snackBar.open('Product deleted', 'Undo', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      });

    this.list();
  }


  viewImage(image: File) {
    return 'data:image/jpeg;base64,' + image;
  }

}
