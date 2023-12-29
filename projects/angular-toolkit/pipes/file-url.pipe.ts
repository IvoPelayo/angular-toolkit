import { OnDestroy, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileUrl', pure: false })
export class FileUrlPipe implements PipeTransform, OnDestroy {
    private _url?: string;

    private _file?: File | Blob;

    public transform(value: File | Blob): string {
        if (!value) {
            this.revoke();
            return '';
        }

        return this.getUrl(value);
    }

    public ngOnDestroy(): void {
        this.revoke();
    }

    private getUrl(file: File | Blob): string {
        if (!this._url || file !== this._file) {
            this._url = URL.createObjectURL(file);
            this._file = file;
        }

        return this._url;
    }

    private revoke() : void {
        if (this._url) {
            URL.revokeObjectURL(this._url);
            this._file = undefined;
            this._url = undefined;
        }
    }
}
