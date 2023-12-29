import { ModuleWithProviders, NgModule } from '@angular/core';
import { BroadcastService } from './broadcast.service';

@NgModule()
export class ToolkitBroadcastModule {
  public static forRoot(): ModuleWithProviders<ToolkitBroadcastModule> {
    return {
      ngModule: ToolkitBroadcastModule,
      providers: [
        BroadcastService,
      ],
    }
}
}
