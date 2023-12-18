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
export class LoaderToolkitModule {
  public static forRoot(): ModuleWithProviders<LoaderToolkitModule> {
    return {
      ngModule: LoaderToolkitModule,
      providers: [
        LoaderService,
      ],
    }
}
}
