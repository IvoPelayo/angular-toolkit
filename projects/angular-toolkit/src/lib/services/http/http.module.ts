import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpService } from './http.service';

@NgModule({})
export class HttpToolkitModule {
  public static forRoot(): ModuleWithProviders<HttpToolkitModule> {
    return {
      ngModule: HttpToolkitModule,
      providers: [
        HttpService,
      ],
    }
}
}
