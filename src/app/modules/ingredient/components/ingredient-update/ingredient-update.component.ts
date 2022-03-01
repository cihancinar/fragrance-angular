import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../../ingredient/models/ingredient.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IngredientService} from "../../../ingredient/services/ingredient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ingredient-update',
  templateUrl: './ingredient-update.component.html',
  styleUrls: ['./ingredient-update.component.scss']
})
export class IngredientUpdateComponent implements OnInit {

  dataSource!: Ingredient;

  ingredientForm!: FormGroup;

  selectedFile?: File;
  preview: any;

  loading: boolean = false;
  errorMessage: string = "";

  constructor(private formBuilder: FormBuilder,
              private ingredientService: IngredientService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private _snackBar: MatSnackBar) {
    this.ingredientForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: '',
      image: null,
    });
  }

  ngOnInit(): void {
    const ingredientId = this.route.snapshot.paramMap.get('ingredientId');

    this.loading = true;
    this.errorMessage = "";
    this.ingredientService.getIngredient(ingredientId)
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

  submit() {
    if (!this.ingredientForm.valid) {
      return;
    }

    let ingredient = new Ingredient(this.ingredientForm.value);
    ingredient.image = this.selectedFile;

    this.loading = true;
    this.errorMessage = "";
    this.ingredientService.updateIngredient(this.dataSource.id, ingredient)
      .subscribe(resp => {
          this.loading = false;
          this._snackBar.open('Ingredient updated', 'Undo', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
          this.router.navigateByUrl('/ingredient/' + resp.id);
        },
        (error => {
          this.errorMessage = error;
          this.loading = false;
        })
      );
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ingredientForm.controls[controlName].hasError(errorName);
  }

  viewImage(image: File) {
    return 'data:image/jpeg;base64,' + image;
  }

  back(): void {
    this.location.back();
  }

}
