import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolkitTableComponent } from './toolkit-table/toolkit-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';


@NgModule({
  declarations: [
    ToolkitTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TranslateModule,
    FlexLayoutModule,
  ],
  exports: [
    ToolkitTableComponent
  ],
})
export class ToolkitTableModule { }
