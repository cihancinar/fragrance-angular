import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FragranceService} from "../services/fragrance.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Fragrance} from "../interfaces/fragrance";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-fragrance-create',
  templateUrl: './fragrance-create.component.html',
  styleUrls: ['./fragrance-create.component.scss']
})
export class FragranceCreateComponent implements OnInit {
  fragranceForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private fragranceService: FragranceService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.fragranceForm = this.formBuilder.group({
      name: [null, Validators.required],
      capacityMl: [null, Validators.required],
      date: [null, Validators.required],
      sales: this.formBuilder.array([]),
    });
  }

  submit() {
    if (!this.fragranceForm.valid) {
      return;
    }

    const fragrance = new Fragrance(this.fragranceForm.value);
    this.fragranceService.createFragrance(fragrance)
      .subscribe(resp => {
          this._snackBar.open('Fragrance created', 'Undo', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
          this.router.navigateByUrl('/fragrance/' + resp.id);
        }
      );

  }

  back(): void {
    this.location.back();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.fragranceForm.controls[controlName].hasError(errorName);
  }

  getSales(): FormArray {
    return this.fragranceForm.get("sales") as FormArray;
  }

  newSale(): FormGroup {
    return this.formBuilder.group({
      count: '',
      city: '',
      date: ''
    });
  }

  addSale() {
    this.getSales().push(this.newSale())
  }

  removeSale(i: number) {
    this.getSales().removeAt(i)
  }
}
