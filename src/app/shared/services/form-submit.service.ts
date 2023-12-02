import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormInputValuesType} from "../../../types/formInputValues.type";

@Injectable({
  providedIn: 'root'
})
export class FormSubmitService {

  constructor(private http: HttpClient) {
  }

  sendFormData(formData: FormInputValuesType) {
    return this.http.post<{success: boolean, message?: string}>('https://testologia.site/order-tea', formData);
  }
}
