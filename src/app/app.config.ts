import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatNativeDateModule } from '@angular/material/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp({
        projectId: "simple-crm-2437b",
        appId: "1:256505019000:web:615499ba28239603b30b8d",
        storageBucket: "simple-crm-2437b.appspot.com",
        apiKey: "AIzaSyAK5QmtJHeA_0llwQrdGJXOiSO8U6-fuTw",
        authDomain: "simple-crm-2437b.firebaseapp.com",
        messagingSenderId: "256505019000"
      })),
      provideFirestore(() => getFirestore()),
      MatNativeDateModule
    )
  ]
};
