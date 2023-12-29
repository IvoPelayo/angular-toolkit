import { NgModule, ModuleWithProviders, Optional, SkipSelf, InjectionToken, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAnalyticsService } from './analitycs/analitycs.service';
import { GoogleTagManagerService } from './tag-manager/tag-manager.service';

export const GOOGLE_SERVICE_ID = new InjectionToken<string>('GOOGLE_SERVICE_ID');

export interface IToolkitGoogleConfig {
  gtmTrackingId?: number;
  analyticsId?: number;
  firebaseConfig: {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
  },
  gmapsApiKey?: string,
}

@NgModule({
  imports: [CommonModule],
})
export class ToolkitGoogleModule {
  constructor(@Optional() @SkipSelf() parentModule?: ToolkitGoogleModule) {
    if (parentModule) {
      throw new Error("You are already have an instance of ToolkitGoogleModule. Only a single instance is allowed.");
    }
  }

  public static forRoot(config: IToolkitGoogleConfig): ModuleWithProviders<ToolkitGoogleModule> {
    const providers: Provider[] = [];

    if(config.analyticsId && config.gtmTrackingId){
      throw new Error("Cannot use Google Analytics & Google Tag Manager at the same time, please review your configuration.");
    }
    else if(config.analyticsId) {
      providers.push({
        provide: GOOGLE_SERVICE_ID,
        useValue: config.analyticsId
      });
      providers.push(GoogleAnalyticsService);
    } else if (config.gtmTrackingId){
      providers.push({
        provide: GOOGLE_SERVICE_ID,
        useValue: config.gtmTrackingId
      });
      providers.push(GoogleTagManagerService);
    }
    

    return {
      ngModule: ToolkitGoogleModule,
      providers: [
        ...providers,
      ]
    }
  }
}
