import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrandListComponent} from "./components/brand-list/brand-list.component";
import {BrandCreateComponent} from "./components/brand-create/brand-create.component";
import {BrandDetailsComponent} from "./components/brand-details/brand-details.component";
import {BrandUpdateComponent} from "./components/brand-update/brand-update.component";

const routes: Routes = [
  {path: '', component: BrandListComponent},
  {path: 'create', component: BrandCreateComponent},
  {path: ':brandId', component: BrandDetailsComponent},
  {path: ':brandId/update', component: BrandUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule {
}
