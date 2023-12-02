import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AccordionService} from "../../services/accordion.service";
import {AccordionType} from "../../../../types/accordion.type";

@Component({
  selector: 'accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss']
})
export class AccordionItemComponent {
  @Input() accordionItem: AccordionType;

  constructor() {
    this.accordionItem = {
      id: 0,
      question: '',
      answer: '',
      isActive: false
    }
  }

  toggleAccordionItem(): void {
    this.accordionItem.isActive = !this.accordionItem.isActive;
  }

  getButtonClasses(): { [key: string]: boolean } {
    return {
      'accordion-button': true,
      'collapsed': !this.accordionItem.isActive,
      'expanded': this.accordionItem.isActive
    };
  }
}
