import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IngredientRoutingModule} from './ingredient-routing.module';
import {IngredientListComponent} from './components/ingredient-list/ingredient-list.component';
import {IngredientDetailsComponent} from './components/ingredient-details/ingredient-details.component';
import {IngredientCreateComponent} from './components/ingredient-create/ingredient-create.component';
import {IngredientUpdateComponent} from './components/ingredient-update/ingredient-update.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    IngredientListComponent,
    IngredientDetailsComponent,
    IngredientCreateComponent,
    IngredientUpdateComponent
  ],
  imports: [
    CommonModule,
    IngredientRoutingModule,
    MatProgressBarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class IngredientModule {
}
