import {Component, Input} from '@angular/core';
import {TeaProductType} from "../../../../types/tea-product.type";

@Component({
  selector: 'tea-product-card',
  templateUrl: './tea-product-card.component.html',
  styleUrls: ['./tea-product-card.component.scss']
})
export class TeaProductCardComponent {

  @Input() teaProduct: TeaProductType;

  constructor() {
    this.teaProduct = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    }
  }
}
