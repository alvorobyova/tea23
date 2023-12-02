import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TeaProductsRoutingModule} from './tea-products-routing.module';
import {CatalogComponent} from "./catalog/catalog.component";
import {TeaProductComponent} from "./tea-product/tea-product.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    CatalogComponent,
    TeaProductComponent,
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TeaProductsRoutingModule
  ],
  exports: [
    TeaProductsRoutingModule
  ]
})
export class TeaProductsModule { }
