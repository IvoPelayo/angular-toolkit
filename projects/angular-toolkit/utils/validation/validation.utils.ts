import { FormGroup, FormControl, AbstractControl, FormArray } from '@angular/forms';

export class FormValidations {
    public static validateForm(formGroup: FormGroup): boolean {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateForm(control);
            } else if (control instanceof FormArray
                && control.controls.length > 0
                && control.controls[0] instanceof FormGroup) {
                  control.controls.forEach(c => { this.validateForm(c as FormGroup); return c; });
            }
        });

        return formGroup.valid;
    }

    public static removeError(control: AbstractControl, error: string) {
        if (control.errors) {
            control.errors[error] = undefined;
            if (Object.keys(control.errors).length === 0) {
                control.setErrors(null);
            }
        }
    }
}
