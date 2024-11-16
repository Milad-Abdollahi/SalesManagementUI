import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class CustomErrorHandlerService implements ErrorHandler {
    constructor(private snackBar: MatSnackBar, private zone: NgZone) {}
    handleError(error: any): void {
        this.zone.run(() => {
            this.snackBar.open('An Error Occured!', 'Colse', { duration: 1000 });
        });
        console.warn('Error Caught by custom-error-handler ', error);
    }
}
