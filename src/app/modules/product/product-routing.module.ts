import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductCreateComponent} from "./components/product-create/product-create.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {ProductUpdateComponent} from "./components/product-update/product-update.component";
import {ModelListComponent} from "./components/model-list/model-list.component";
import {ModelCreateComponent} from "./components/model-create/model-create.component";
import {ModelDetailsComponent} from "./components/model-details/model-details.component";
import {ModelUpdateComponent} from "./components/model-update/model-update.component";

const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'create', component: ProductCreateComponent},
  {path: ':productId', component: ProductDetailsComponent},
  {path: ':productId/update', component: ProductUpdateComponent},
  {path: ':productId/model', component: ModelListComponent},
  {path: ':productId/model/create', component: ModelCreateComponent},
  {path: ':productId/model/:modelId', component: ModelDetailsComponent},
  {path: ':productId/model/:modelId/update', component: ModelUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
