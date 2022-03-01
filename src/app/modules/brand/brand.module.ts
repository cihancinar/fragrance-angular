import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrandRoutingModule} from './brand-routing.module';
import {BrandListComponent} from './components/brand-list/brand-list.component';
import {BrandCreateComponent} from './components/brand-create/brand-create.component';
import {BrandDetailsComponent} from './components/brand-details/brand-details.component';
import {BrandUpdateComponent} from './components/brand-update/brand-update.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    BrandListComponent,
    BrandCreateComponent,
    BrandDetailsComponent,
    BrandUpdateComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    MatProgressBarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule
  ]
})
export class BrandModule {
}
