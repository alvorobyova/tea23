import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccordionType} from "../../../types/accordion.type";
import {AccordionService} from "../../shared/services/accordion.service";
import {Subject, Subscription, takeUntil, timer} from "rxjs";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {

  modalIsShow: boolean = false;

  accordionItems: AccordionType[] = [];
  private popup$ = new Subject<void>();

  constructor(private accordionService: AccordionService) {

  }

  ngOnInit() {
    this.accordionItems = this.accordionService.getAccordionItems();

   /* timer(10000)
      .pipe(takeUntil(this.popup$))
      .subscribe(() => {
        this.modalIsShow = true;
      });*/

  }

  ngOnDestroy() {
    this.popup$.unsubscribe();
  }
}
