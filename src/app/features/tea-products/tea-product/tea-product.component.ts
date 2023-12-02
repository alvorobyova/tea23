import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeaProductType} from "../../../../types/tea-product.type";
import {TeaProductService} from "../../../shared/services/tea-product.service";
import {Subscription, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'tea-product-component',
  templateUrl: './tea-product.component.html',
  styleUrls: ['./tea-product.component.scss']
})
export class TeaProductComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  teaProduct: TeaProductType;
  private subscriptionTeaProduct: Subscription | null = null;

  constructor(private teaProductService:TeaProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.teaProduct = {
      id: 0,
      image: '',
      title: '',
      description: '',
      price: 0
    }

  }

  ngOnInit() {
    this.loading = true;

    this.subscriptionTeaProduct = this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.teaProductService.getTeaProduct(+params['id'])
          .pipe(
            tap(() => {
              this.loading = false;
            })
          )
          .subscribe({
            next: (data) => {
              this.teaProduct = data;
            },
            error: (error) => {
              this.router.navigate(['/'])
            }
          })
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionTeaProduct?.unsubscribe();
  }

}
