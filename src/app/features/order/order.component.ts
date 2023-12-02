import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {CustomValidators} from "../../shared/validators/custom-validators";
import {FormSubmitService} from "../../shared/services/form-submit.service";
import {FormInputValuesType} from "../../../types/formInputValues.type";

declare var $: any;
// declare var bootstrap: any;

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  isFormVisible: boolean = true;
  isSuccessWindowShowed: boolean = false;
  buttonIsBlocked: boolean = false;

  private subscription: Subscription | null = null;
  private subscriptionFormData: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private formSubmitService: FormSubmitService) {
  }

  orderForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.pattern('^[а-яА-Я]+$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[а-яА-Я]+$')]],
      phone: ['', [Validators.required, Validators.pattern('^[+]?[7]{1}[0-9]{10}')]],
      country: ['', [Validators.required, Validators.pattern('^[а-яА-Я]+$')]],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{6,7}$')]],
      product: [{value: '', disabled: true}, Validators.required],
      address: ['', [Validators.required, CustomValidators.addressValidator]],
      comment: [''],
    }
  )

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      if (params['teaProduct']) {
        this.orderForm.patchValue({
          product: params['teaProduct'],
        })
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionFormData?.unsubscribe();
  }

  submit(): void {
    this.orderForm.get('product')?.enable(); // чтобы значение поля product включилось в объект значений формы при отправке

    if (this.orderForm.value) {
      const formData: FormInputValuesType = {
        name: this.orderForm.value.name,
        last_name: this.orderForm.value.last_name,
        phone: this.orderForm.value.phone,
        country: this.orderForm.value.country,
        zip: this.orderForm.value.zip,
        product: this.orderForm.value.product,
        address: this.orderForm.value.address,
        comment: this.orderForm.value.comment,
      };

      this.subscriptionFormData = this.formSubmitService.sendFormData(formData)
        .subscribe(response => {
            this.buttonIsBlocked = true; // блокировка кнопки
            if (response.success) {
              this.orderForm.reset();
              console.log('успех');
              this.isFormVisible = false;
              this.isSuccessWindowShowed = true;
            } else {
              setTimeout(() => {
              this.showPopover();
            }, 0)
            }
          },
          (error) => {
            console.error('Ошибка: ', error);
          }
        )
    }
    // console.log(this.orderForm.value);
  }

  showPopover() {
    /*const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));*/

    $('[data-bs-toggle="popover"]').popover('show');

    setTimeout(() => {
      $('[data-bs-toggle="popover"]').popover('hide');
    }, 3000);
  }

}
