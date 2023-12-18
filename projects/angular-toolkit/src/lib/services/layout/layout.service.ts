import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { MediaObserver, MediaChange } from '@ngbracket/ngx-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay, tap } from 'rxjs';

@Injectable()
export class LayoutService {
    public isMobile:boolean = false;
    public isMobile$: Observable<boolean> = this.mediaObserver.asObservable()
      .pipe(
        map((changes: MediaChange[]) => changes.filter(c => c.mqAlias === 'lt-md').length > 0),
        tap(isMobile => {
          this.isMobile = isMobile;
          this.setBodyClass('mobile', isMobile);
          this.setBodyClass('desktop', !isMobile);
        }),
        shareReplay()
    );

    public isLandscape:boolean = false;
    isLandscape$: Observable<boolean> = this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
    ])
    .pipe(
      map(result => result.matches),
      tap(isLandscape => {
        this.isLandscape = isLandscape;
        this.setBodyClass('landscape', isLandscape);
      }),
      shareReplay()
    );

    public isPortrait:boolean = false;
    isPortrait$: Observable<boolean> = this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
    ])
    .pipe(
      map(result => result.matches),
      tap(isPortrait => {
        this.isPortrait = isPortrait;
        this.setBodyClass('portrait', isPortrait);
      }),
      shareReplay()
    );

    private renderer: Renderer2;

    constructor(
        private mediaObserver: MediaObserver,
        private breakpointObserver: BreakpointObserver,
        private rendererFactory: RendererFactory2,
    ) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    private setBodyClass(cssClass: string, enabled: boolean): void {
        enabled ?
                this.renderer?.addClass(document.body, cssClass)
                : this.renderer?.removeClass(document.body, cssClass);
    }
}
