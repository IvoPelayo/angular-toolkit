import { IColumnConfig } from "../types/column-config.interface";

export class ColumnService {
  public customColumnDefLoaded = false;
  private _displayedColumns: IColumnConfig[] = [];

  public get columns(): IColumnConfig[] {
    return this._displayedColumns.filter(c => !c.custom && this.isColumnVisible(c));
  }

  public get columnNames(): string[] {
    return (this.customColumnDefLoaded ? this._displayedColumns : this.columns).filter(c => this.isColumnVisible(c)).map(column => column.name);
  }

  public initialize(columns: IColumnConfig[]): void {
    this._displayedColumns = columns;
  }

  public renderCell(element: Record<string, unknown>, column: IColumnConfig): string | undefined {
    const value = column.formatter ? column.formatter(element[column.name]) : element[column.name];
    return value as string || ' ';
  }

  private isColumnVisible(col: IColumnConfig): boolean {
    return !col.visible || col.visible();
  }
}
