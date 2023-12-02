import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogComponent} from "./catalog/catalog.component";
import {TeaProductComponent} from "./tea-product/tea-product.component";

const routes: Routes = [
  {path: 'catalog', component: CatalogComponent},
  {path: 'tea-product/:id', component: TeaProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeaProductsRoutingModule { }
