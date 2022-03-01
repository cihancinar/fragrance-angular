import {Component, OnInit} from '@angular/core';
import {FragranceService} from "../services/fragrance.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Fragrance} from "../interfaces/fragrance";
import {Location} from '@angular/common';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-fragrance-details',
  templateUrl: './fragrance-details.component.html',
  styleUrls: ['./fragrance-details.component.scss']
})
export class FragranceDetailsComponent implements OnInit {
  dataSource!: Fragrance;
  loading: boolean = false;
  errorMessage: string = "";

  constructor(
    private fragranceService: FragranceService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const fragranceId = this.route.snapshot.paramMap.get('fragranceId');

    this.loading = true;
    this.errorMessage = "";
    this.fragranceService.getFragrance(fragranceId)
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

  back(): void {
    this.location.back();
  }

  delete() {
    const fragranceId = this.route.snapshot.paramMap.get('fragranceId');

    this.fragranceService.deleteFragrance(fragranceId)
      .subscribe(
        (resp) => {
          this._snackBar.open('Fragrance deleted', 'Undo', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
          this.loading = false;
        },
        (error => {
          this.errorMessage = error;
          this.loading = false;
        })
      );

    this.back();
  }
}
