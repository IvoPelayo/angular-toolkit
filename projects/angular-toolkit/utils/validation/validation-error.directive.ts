import {
    Directive,
    OnDestroy,
    Inject,
    Input,
    AfterViewInit,
    Host,
    ElementRef,
    Optional
} from '@angular/core';
import { Observable, Subscription, merge } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatFormField } from '@angular/material/form-field';
import { FormGroupDirective, FormArrayName } from '@angular/forms';
import { FORM_ERRORS } from './validations.module';

@Directive({
  selector: '[validationMessages]'
})
export class ValidationErrorDirective implements AfterViewInit, OnDestroy {
    private subscription?: Subscription;
    @Input() validationMessages?: { [key: string]: any };

    constructor(private el: ElementRef<HTMLElement>,
                @Optional() @Host() private form: FormGroupDirective,
                @Optional() @Host() private array: FormArrayName,
                @Optional() @Host() private field: MatFormField,
                @Inject(FORM_ERRORS) private errors: { [key:string]: string },
                private translate: TranslateService) {
                }

    ngAfterViewInit() {
        if (this.field) {
            this.subscription = this.field._control.stateChanges.subscribe(() => {
                const controlErrors = this.field?._control?.ngControl?.errors;
                this.setError(controlErrors);
            });
        }
        else if (this.array) {
            this.array.statusChanges?.subscribe(() => this.setError(this.array.errors));
            this.array.valueChanges?.subscribe(() => this.setError(this.array.errors));
        }
        else if (this.form) {
          this.form.statusChanges?.subscribe(() => this.setError(this.form.errors));
          this.form.ngSubmit.asObservable().subscribe(() => this.setError(this.form.errors));
        }
    }

    setError(errors: any) {
        let text = null;
        if (errors) {
            const firstKey = Object.keys(errors)[0];
            const errorMessage = (this.validationMessages ?? this.errors)[firstKey];
            if (errorMessage) {
                text = this.translate.instant(errorMessage, errors[firstKey]);
            }
        }

        this.el.nativeElement.hidden = !text;
        this.el.nativeElement.innerHTML = text;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
