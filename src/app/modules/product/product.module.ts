import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {ProductCreateComponent} from './components/product-create/product-create.component';
import {ProductUpdateComponent} from './components/product-update/product-update.component';
import {ModelListComponent} from './components/model-list/model-list.component';
import {ModelDetailsComponent} from './components/model-details/model-details.component';
import {ModelCreateComponent} from './components/model-create/model-create.component';
import {ModelUpdateComponent} from './components/model-update/model-update.component';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ModelListComponent,
    ModelDetailsComponent,
    ModelCreateComponent,
    ModelUpdateComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    FlexModule
  ]
})
export class ProductModule {
}
