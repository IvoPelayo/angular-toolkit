import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoaderService } from './loader.service';
import { LoadingOverlayComponent } from './components/loading-overlay/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    MatProgressSpinnerModule,
    TranslateModule,
  ],
  declarations: [
    LoadingOverlayComponent
  ]
})
export class ToolkitLoaderModule {
  public static forRoot(): ModuleWithProviders<ToolkitLoaderModule> {
    return {
      ngModule: ToolkitLoaderModule,
      providers: [
        LoaderService,
      ],
    }
}
}
