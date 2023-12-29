import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpService } from './http.service';

@NgModule({})
export class ToolkitHttpModule {
  public static forRoot(): ModuleWithProviders<ToolkitHttpModule> {
    return {
      ngModule: ToolkitHttpModule,
      providers: [
        HttpService,
      ],
    }
}
}
