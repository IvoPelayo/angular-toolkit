import { Injectable, RendererFactory2, Renderer2, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { GOOGLE_SERVICE_ID } from '../google.module';

export type Tracker = {
  send: (
    hitType: string,
    category: string,
    action: string,
    label?: string
  ) => void;
};

declare const gtag: {
  (...args: any[]): () => void;
  getAll: () => Tracker[];
};

const has = Object.prototype.hasOwnProperty;

@Injectable()
export class GoogleAnalyticsService {
  private _renderer2!: Renderer2;
  private INVALID_ENV_REGEX = /^(UA-\d{9}-\d{1}|G-\d{10})$/;
  private _document: Document = inject(DOCUMENT);
  private _config?: string = inject(GOOGLE_SERVICE_ID);

  constructor(private router: Router,
    private rendererFactory: RendererFactory2) {
    if (this._config && this.INVALID_ENV_REGEX.test(this._config)) {
      this._renderer2 = rendererFactory.createRenderer(null, null);
      this.loadGoogleAnalytics();
      this.subscribeEvents();
    }
  }

  private loadGoogleAnalytics(): void {
    const gTagManagerScript = this._renderer2.createElement('script');
    gTagManagerScript.async = true;
    gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${this._config}`;

    this._renderer2.appendChild(this._document.head, gTagManagerScript);

    const gaScript = this._renderer2.createElement('script');
    gaScript.innerHTML = `
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${this._config}');
            `;
    this._renderer2.appendChild(this._document.head, gaScript);
  }

  private subscribeEvents(): void {
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd && has.call(window, "gtag"))
    )
    .subscribe({
      next: (event) => {
        gtag("set", "page", (event as NavigationEnd).urlAfterRedirects);
        gtag("send", "pageview");
      }
    });
  }

  logCustomEvent(
    eventCategory: string,
    eventAction: string,
    eventLabel?: string
  ) {
    if (has.call(window, "gtag")) {
      gtag("event", eventAction, { 'event_category': eventCategory, 'event_label': eventLabel });
    }
  }
}