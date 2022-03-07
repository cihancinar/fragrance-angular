import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BrandService} from "../../services/brand.service";
import {Brand} from "../../models/brand.model";

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent implements OnInit {
  dataSource!: Brand;
  loading: boolean = false;
  errorMessage: string = "";

  constructor(
    private brandService: BrandService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const brandId = this.route.snapshot.paramMap.get('brandId');

    this.loading = true;
    this.errorMessage = "";
    this.brandService.getBrand(brandId)
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
    this.router.navigate(['brand']);
  }

  delete() {
    const brandId = this.route.snapshot.paramMap.get('brandId');

    this.brandService.deleteBrand(brandId)
      .subscribe({
        next: () => {
          this._snackBar.open('Brand deleted', 'Undo', {
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
