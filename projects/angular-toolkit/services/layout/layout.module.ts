import { ModuleWithProviders, NgModule } from '@angular/core';
import { LayoutService } from './layout.service';

@NgModule({})
export class LayoutToolkitModule {
  public static forRoot(): ModuleWithProviders<LayoutToolkitModule> {
    return {
      ngModule: LayoutToolkitModule,
      providers: [
        LayoutService,
      ],
    }
}
}
