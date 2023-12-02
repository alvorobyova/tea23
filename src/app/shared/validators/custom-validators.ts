import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidators {
  static addressValidator(control: AbstractControl): ValidationErrors | null {
    const result = /^[А-Яа-я0-9\s\/\-]+$/.test(control.value);
    return result ? null : {address: {value: control.value}};
  }

}
