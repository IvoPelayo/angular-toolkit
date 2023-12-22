import { Sort, SortDirection } from "@angular/material/sort";

export interface IPaginationConfig {
  page: number;
  pageSize?: number;
  totalRecords?: number;
  pageSizeOptions?: number[];
}

export class PaginationConfig implements IPaginationConfig, Sort {
  public page = 1;
  public pageSize?: number;
  public totalRecords?: number;
  public pageSizeOptions?: number[] = [5, 10, 20, 50, 100];
  public active!: string;
  public direction!: SortDirection;

  constructor(public config?: IPaginationConfig) {
    if (config) {
      Object.assign(this, config);
    }
  }
}