import {Component, OnInit} from '@angular/core';
import {FragranceService} from "../services/fragrance.service";
import {Fragrance} from "../interfaces/fragrance";

@Component({
  selector: 'app-fragrance',
  templateUrl: './fragrance.component.html',
  styleUrls: ['./fragrance.component.scss']
})
export class FragranceComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'capacityMl', 'date', 'option'];
  dataSource: Fragrance[] = [];
  loading: boolean = false;
  errorMessage: string = "";

  constructor(private fragranceService: FragranceService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.errorMessage = "";
    this.fragranceService.getFragrances()
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
    this.fragranceService.deleteFragrance(id)
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
}
