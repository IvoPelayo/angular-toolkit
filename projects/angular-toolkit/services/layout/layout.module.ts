import { ModuleWithProviders, NgModule } from '@angular/core';
import { LayoutService } from './layout.service';

@NgModule({})
export class ToolkitLayoutModule {
  public static forRoot(): ModuleWithProviders<ToolkitLayoutModule> {
    return {
      ngModule: ToolkitLayoutModule,
      providers: [
        LayoutService,
      ],
    }
}
}
