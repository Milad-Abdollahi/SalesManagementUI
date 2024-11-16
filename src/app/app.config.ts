import {
    ApplicationConfig,
    ErrorHandler,
    importProvidersFrom,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { CustomErrorHandlerService } from './shared/error/custom-error-handler.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(MatSnackBarModule),
        { provide: ErrorHandler, useClass: CustomErrorHandlerService },
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(), provideAnimationsAsync(),
    ],
};
