import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SafeUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lib-footer-navigation-layout',
  templateUrl: './footer-navigation-layout.component.html',
  styleUrls: ['./footer-navigation-layout.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    TranslateModule,
  ],
  standalone: true
})
export class FooterNavigationLayoutComponent {
  @Input() logoImage?: string | SafeUrl;
  @Input() logoImageUri?: string;
}
