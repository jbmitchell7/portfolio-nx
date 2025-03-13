import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { myTheme } from './app.theme';
import { darkModeSelector } from '@shared-global/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: myTheme,
            options: {
              darkModeSelector
            }
        }
    })
  ]
};