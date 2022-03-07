import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  dataSource!: Category;
  loading: boolean = false;
  errorMessage: string = "";

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');

    this.loading = true;
    this.errorMessage = "";
    this.categoryService.getCategory(categoryId)
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
    this.router.navigate(['category']);
  }

  delete() {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');

    this.categoryService.deleteCategory(categoryId)
      .subscribe({
        next: () => {
          this._snackBar.open('Category deleted', 'Undo', {
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
