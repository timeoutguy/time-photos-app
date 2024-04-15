import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function samePasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')

    return password && confirmPassword && password.value !== confirmPassword.value ? { samePassword: true } : null
  }
}
