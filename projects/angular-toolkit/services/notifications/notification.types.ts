export enum NotificationType {
    Success = 'success',
    Error = 'error',
    Alert = 'alert',
    Info = 'info',
    Warn = 'warn',
    Bare = 'bare'
}

export interface IDialogOptions {
  message: string;
  title?: string;
  width?: any;

  titleParams?: any;
  messageParams?: any;
}

export class DialogOptions implements IDialogOptions {
  message!: string;
  title?: string;
  width?: any;

  titleParams?: any;
  messageParams?: any;

  constructor(obj?: IDialogOptions) {
    if(obj) {
      Object.assign(this, obj);
    }
  }
}



export interface IAcceptOptions extends IDialogOptions {
    acceptButtonText?: string;
}

export class AcceptOptions extends DialogOptions implements IAcceptOptions {
    acceptButtonText!: string;

    constructor(obj?: IAcceptOptions) {
        super(obj);
        this.setDefaults();
    }

    private setDefaults() {
        this.acceptButtonText = this.acceptButtonText || 'angular-toolkit.notifications.accept';
    }
}

export interface IConfirmOptions extends IDialogOptions {
  acceptButtonText?: string;
  declineButtonText?: string;
}

export class ConfirmOptions extends DialogOptions implements IConfirmOptions {
  acceptButtonText!: string;
  declineButtonText!: string;

  constructor(obj?: IConfirmOptions) {
      super(obj);
      this.setDefaults();
  }

  private setDefaults() {
      this.acceptButtonText = this.acceptButtonText || 'angular-toolkit.notifications.accept';
      this.declineButtonText = this.declineButtonText || 'angular-toolkit.notifications.cancel';
  }
}


