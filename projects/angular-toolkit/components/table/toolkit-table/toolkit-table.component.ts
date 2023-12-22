import { AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { ColumnService } from '../services/column.service';
import { IColumnConfig } from '../types/column-config.interface';
import { IPaginationConfig, PaginationConfig } from '../types/pagination-config.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'toolkit-table',
  templateUrl: './toolkit-table.component.html',
  providers: [
    ColumnService,
  ]
})
export class ToolkitTableComponent<T> implements OnChanges, AfterViewInit, OnInit {

  @Input() public dataSource!: MatTableDataSource<T> | T[] | Observable<T[]>;

  @Input() public columns: IColumnConfig[] = [];

  @Input() public config: IPaginationConfig = new PaginationConfig();
  @Output() public configChange: EventEmitter<IPaginationConfig> = new EventEmitter<IPaginationConfig>();

  @ContentChildren(MatColumnDef) public customColumns?: QueryList<MatColumnDef>;

  @ViewChild(MatTable, { static: false }) public table?: MatTable<T>;
  @ViewChild(MatPaginator) public paginator?: MatPaginator;
  @ViewChild(MatSort) public sort?: MatSort;

  @Output() public rowClicked: EventEmitter<T> = new EventEmitter<T>();

  constructor(public columnService: ColumnService) {}

  public ngOnInit(): void {
    this.columnService.initialize(this.columns);
  }

  public ngAfterViewInit(): void {
    if(this.dataSource instanceof MatTableDataSource) {
      this.dataSource.paginator = this.paginator ?? null;
      this.dataSource.sort = this.sort ?? null;
    }

    if(this.sort && this.config instanceof PaginationConfig) {
      this.sort.active = this.config.active ?? this.sort?.active;
      this.sort.direction = this.config.direction ?? this.sort?.direction;
    }

    this.sort?.sortChange.subscribe((sort) => {
      this.configChange.emit({...this.config, ...sort });
    });

    this.customColumns?.forEach(columnDef => this.table?.addColumnDef(columnDef));
    this.columnService.customColumnDefLoaded = true;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']?.previousValue !== changes['columns']?.currentValue) {
      this.columnService.initialize(this.columns);
    }
  }

  public onPaginationChange(event: PageEvent): void {
    this.configChange.emit({ ...this.config, page: event.pageIndex + 1, pageSize:  event.pageSize });
  }
}
