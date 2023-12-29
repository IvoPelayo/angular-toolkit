import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'lib-admin-panel-layout',
  templateUrl: './admin-panel-layout.component.html',
  styleUrls: ['./admin-panel-layout.component.scss'],
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
export class AdminPanelLayoutComponent {
    @Input() logoImage?: string | SafeUrl;
    @Input() logoImageUri?: string;
}
