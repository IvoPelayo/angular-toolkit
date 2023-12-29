import { Injectable, RendererFactory2, Renderer2, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GOOGLE_SERVICE_ID } from '../google.module';


@Injectable()
export class GoogleTagManagerService {
  private _renderer2!: Renderer2;
  private INVALID_ENV_REGEX = /^GTM-[A-Z0-9]{4,}$/;

  private _document: Document = inject(DOCUMENT);
  private _config?: string = inject(GOOGLE_SERVICE_ID);

  constructor(
    private rendererFactory: RendererFactory2,
  ) {
    if (this._config && this.INVALID_ENV_REGEX.test(this._config)) {
      this._renderer2 = rendererFactory.createRenderer(null, null);
      this.loadGoogleTagManager();
    }
  }

  private loadGoogleTagManager(): void {
    const gtmScript = this._renderer2.createElement('script');
    gtmScript.async = true;
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push(
        {'gtm.start': new Date().getTime(),event:'gtm.js'}
        );var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${this._config}');
      `;
    this._renderer2.appendChild(this._document.head, gtmScript);

    const gtmNoScript = this._renderer2.createElement('noscript');
    gtmNoScript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${this._config}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    this._renderer2.insertBefore(this._document.body, gtmNoScript, document.getElementsByTagName('app-root')[0]);
  }
}
