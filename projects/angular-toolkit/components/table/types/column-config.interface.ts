export interface IColumnConfig {
    name: string;
    title?: string;
    custom?: boolean;
    sort?: boolean;
    sortKey?:string;
    order?: number;
    formatter?: (value: unknown) => unknown;
    visible?: () => boolean;
}

export class ColumnConfig implements IColumnConfig {
    public name!: string;
    public title?: string;
    public custom?: boolean = false;
    public sort?: boolean = true;
    public sortKey?: string;
    public order?: number;
    public formatter?: (value: unknown) => unknown;
    public visible?: () => boolean = () => true;
/* eslint-disable @typescript-eslint/member-ordering */
    constructor(public config?: IColumnConfig) {
        if(config) {
            Object.assign(this, config);
        }
    }
}

