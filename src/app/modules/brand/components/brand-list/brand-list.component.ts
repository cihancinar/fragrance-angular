import {Component, OnInit} from '@angular/core';
import {Brand} from "../../models/brand.model";
import {BrandService} from "../../services/brand.service";

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'image', 'ref', 'description', 'created', 'updated', 'option'];
  dataSource: Brand[] = [];
  loading: boolean = false;
  errorMessage: string = "";

  constructor(private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.errorMessage = "";
    this.brandService.getBrands()
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
    this.brandService.deleteBrand(id)
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
