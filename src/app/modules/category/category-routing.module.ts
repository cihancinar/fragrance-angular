import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryListComponent} from "./components/category-list/category-list.component";
import {CategoryCreateComponent} from "./components/category-create/category-create.component";
import {CategoryDetailsComponent} from "./components/category-details/category-details.component";
import {CategoryUpdateComponent} from "./components/category-update/category-update.component";

const routes: Routes = [
  {path: '', component: CategoryListComponent},
  {path: 'create', component: CategoryCreateComponent},
  {path: ':categoryId', component: CategoryDetailsComponent},
  {path: ':categoryId/update', component: CategoryUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}
