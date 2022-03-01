import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FragranceComponent} from "./modules/fragrance/fragrance-list/fragrance.component";
import {D3Component} from "./modules/d3/d3.component";
import {CommonModule} from '@angular/common';
import {FragranceDetailsComponent} from "./modules/fragrance/fragrance-details/fragrance-details.component";
import {FragranceCreateComponent} from "./modules/fragrance/fragrance-create/fragrance-create.component";
import {NotFoundComponent} from "./core/components/not-found/not-found.component";
import {DocumentationComponent} from "./modules/documentation/documentation/documentation.component";
import {DashboardComponent} from "./modules/dashboard/dashboard/dashboard.component";
import {AuthGuard} from "./core/authentication/auth.guard";

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'dashboard',
    data: {
      breadcrumb: {
        label: 'Home',
        info: 'home'
      }
    }
  },

  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {
    path: 'product',
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'brand',
    loadChildren: () => import('./modules/brand/brand.module').then(m => m.BrandModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ingredient',
    loadChildren: () => import('./modules/ingredient/ingredient.module').then(m => m.IngredientModule),
    canActivate: [AuthGuard]
  },

  {path: 'documentation', component: DocumentationComponent, canActivate: [AuthGuard]},

  {path: 'fragrance', component: FragranceComponent},
  {path: 'fragrance/create', component: FragranceCreateComponent},
  {path: 'fragrance/:fragranceId', component: FragranceDetailsComponent},
  {path: 'd3', component: D3Component},

  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
