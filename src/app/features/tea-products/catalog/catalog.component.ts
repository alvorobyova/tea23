import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TeaProductType} from "../../../../types/tea-product.type";
import {Subscription, tap} from "rxjs";
import {Router} from "@angular/router";
import {TeaSearchService} from "../../../shared/services/tea-search.service";

@Component({
  selector: 'catalog-component',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  teaProducts: TeaProductType [] = [];

  private subscriptionTeaProducts: Subscription | null = null;

  private teaSearchService = inject(TeaSearchService);
  private router = inject(Router);

  ngOnInit() {
    this.loading = true;
    this.teaSearchService.loadTeaProducts();

    this.subscriptionTeaProducts = this.teaSearchService.teaProducts$
      .subscribe({
          next: (data) => {
            this.teaProducts = data;
            this.loading = false;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        })
  }

  ngOnDestroy() {
    this.subscriptionTeaProducts?.unsubscribe();
  }

}
