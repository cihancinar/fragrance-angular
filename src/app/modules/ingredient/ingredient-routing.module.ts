import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IngredientCreateComponent} from "./components/ingredient-create/ingredient-create.component";
import {IngredientDetailsComponent} from "./components/ingredient-details/ingredient-details.component";
import {IngredientListComponent} from "./components/ingredient-list/ingredient-list.component";
import {IngredientUpdateComponent} from "./components/ingredient-update/ingredient-update.component";

const routes: Routes = [
  {path: '', component: IngredientListComponent},
  {path: 'create', component: IngredientCreateComponent},
  {path: ':ingredientId', component: IngredientDetailsComponent},
  {path: ':ingredientId/update', component: IngredientUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientRoutingModule {
}
