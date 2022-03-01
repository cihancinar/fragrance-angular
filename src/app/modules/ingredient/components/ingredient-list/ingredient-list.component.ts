import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../models/ingredient.model";
import {IngredientService} from "../../services/ingredient.service";

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'image', 'ref', 'description', 'created', 'updated', 'option'];
  dataSource: Ingredient[] = [];
  loading: boolean = false;
  errorMessage: string = "";

  constructor(private ingredientService: IngredientService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.errorMessage = "";
    this.ingredientService.getIngredients()
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
    this.ingredientService.deleteIngredient(id)
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
