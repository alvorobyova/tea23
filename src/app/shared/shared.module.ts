import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AccordionItemComponent
} from "./components/accordion-item/accordion-item.component";
import {TeaProductCardComponent} from "./components/tea-product-card/tea-product-card.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AccordionItemComponent,
    TeaProductCardComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    AccordionItemComponent,
    TeaProductCardComponent
  ]
})
export class SharedModule {
}
