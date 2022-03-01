import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'image', 'ref', 'description', 'created', 'updated', 'option'];
  dataSource: Category[] = [];
  loading: boolean = false;
  errorMessage: string = "";

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.errorMessage = "";
    this.categoryService.getCategories()
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
    this.categoryService.deleteCategory(id)
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
