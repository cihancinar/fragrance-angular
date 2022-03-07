import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../../ingredient/models/ingredient.model";
import {IngredientService} from "../../../ingredient/services/ingredient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.scss']
})
export class IngredientDetailsComponent implements OnInit {

  dataSource!: Ingredient;
  loading: boolean = false;
  errorMessage: string = "";

  constructor(
    private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const ingredientId = this.route.snapshot.paramMap.get('ingredientId');

    this.loading = true;
    this.errorMessage = "";
    this.ingredientService.getIngredient(ingredientId)
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
    this.router.navigate(['ingredient']);
  }

  delete() {
    const ingredientId = this.route.snapshot.paramMap.get('ingredientId');

    this.ingredientService.deleteIngredient(ingredientId)
      .subscribe({
        next: (resp) => {
          this._snackBar.open('Ingredient deleted', 'Undo', {
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
