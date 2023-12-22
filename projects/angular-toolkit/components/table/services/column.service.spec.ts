import { TestBed } from '@angular/core/testing';
import { ColumnService } from './column.service';
import { MatSortModule } from '@angular/material/sort';
import { VyGenericTableComponent } from '../toolkit-table/toolkit-table.component';
import { IVyColumnConfig } from '../types/column-config.interface';

describe('ColumnService', () => {
  let service: ColumnService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VyGenericTableComponent ],
      providers: [ ColumnService ],
      imports: [ MatSortModule ]
    }).compileComponents();

    service = TestBed.inject(ColumnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return column names', () => {
    const mockColumns: IVyColumnConfig[] = [
      { name: 'position', title: 'Position', custom: false, sort: true },
      { name: 'name', title: 'Name', custom: false, sort: true },
      { name: 'weight', title: 'Weight', custom: false, sort: true },
      { name: 'symbol', title: 'Symbol', custom: false, sort: true },
    ];
    service.initialize(mockColumns);
    const columnNames = service.columnNames;
    expect(columnNames).toEqual(['position', 'name', 'weight', 'symbol']);
  });
});
