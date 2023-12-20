import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationErrorDirective } from './validation-error.directive';

export const FORM_ERRORS = new InjectionToken<{ [key: string]: string }>('FORM_ERRORS');

@NgModule({
  declarations: [
    ValidationErrorDirective
  ],
  imports:  [
    TranslateModule,
  ]
})
export class ValidationsToolkitModule {
  public static withMessages(messages: { [key: string]: string }): ModuleWithProviders<ValidationsToolkitModule> {
    return {
      ngModule: ValidationsToolkitModule,
      providers: [
        { provide: FORM_ERRORS, useValue: messages }
      ]
    }
}
}
