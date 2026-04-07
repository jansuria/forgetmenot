import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { NoteEffects } from './features/notes/state/note.effects';
import { noteReducer } from './features/notes/state/note.reducer';
import { providePrimeNG } from 'primeng/config';
import { authReducer } from './features/auth/state/auth.reducers';
import { AuthEffects } from './features/auth/state/auth.effects';
import { CommandEffects } from './features/commands/state/command.effects';
import { commandReducer } from './features/commands/state/command.reducers';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ notes: noteReducer, auth: authReducer, commands: commandReducer }),
    provideEffects([NoteEffects, AuthEffects, CommandEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore(),
    MessageService,

    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    }),
  ],
};
