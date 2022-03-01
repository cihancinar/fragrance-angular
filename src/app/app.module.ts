import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {D3Component} from './modules/d3/d3.component';
import {BarChartVerticalComponent} from './core/components/d3/bar-chart-vertical/bar-chart-vertical.component';
import {FragranceComponent} from './modules/fragrance/fragrance-list/fragrance.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MenuComponent} from './core/components/menu/menu.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {FragranceDetailsComponent} from './modules/fragrance/fragrance-details/fragrance-details.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {FragranceCreateComponent} from './modules/fragrance/fragrance-create/fragrance-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {BrandModule} from "./modules/brand/brand.module";
import {CategoryModule} from "./modules/category/category.module";
import {IngredientModule} from "./modules/ingredient/ingredient.module";
import {ProductModule} from "./modules/product/product.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {NotFoundComponent} from './core/components/not-found/not-found.component';
import {BreadcrumbModule} from "xng-breadcrumb";
import {DocumentationComponent} from './modules/documentation/documentation/documentation.component';
import {DashboardComponent} from './modules/dashboard/dashboard/dashboard.component';
import {PieChartComponent} from "./core/components/d3/pie/pie-chart.component";
import {AuthModule} from "./core/authentication/auth.module";


@NgModule({
  declarations: [
    AppComponent,
    D3Component,
    BarChartVerticalComponent,
    FragranceComponent,
    MenuComponent,
    FragranceDetailsComponent,
    FragranceCreateComponent,
    NotFoundComponent,
    DocumentationComponent,
    DashboardComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatGridListModule,
    BrandModule,
    CategoryModule,
    IngredientModule,
    ProductModule,
    MatDividerModule,
    MatSidenavModule,
    BreadcrumbModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
