import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IngredientService} from "../../services/ingredient.service";
import {Ingredient} from "../../models/ingredient.model";

@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.scss']
})
export class IngredientCreateComponent implements OnInit {

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

  ngOnInit(): void {
  }

  submit() {
    if (!this.ingredientForm.valid) {
      return;
    }

    let ingredient = new Ingredient(this.ingredientForm.value);
    ingredient.image = this.selectedFile;

    this.loading = true;
    this.errorMessage = "";
    this.ingredientService.createIngredient(ingredient)
      .subscribe(resp => {
          this.loading = false;
          this._snackBar.open('Ingredient created', 'Undo', {
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

  public hasError = (controlName: string, errorName: string) => {
    return this.ingredientForm.controls[controlName].hasError(errorName);
  }

  back(): void {
    this.location.back();
  }
}
