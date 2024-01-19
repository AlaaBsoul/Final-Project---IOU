import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmacPA-NAw-g5ce7rdfabqAQ-HWuEBFMI",
  authDomain: "finalproject-9327a.firebaseapp.com",
  projectId: "finalproject-9327a",
  storageBucket: "finalproject-9327a.appspot.com",
  messagingSenderId: "1285289023",
  appId: "1:1285289023:web:e521c39b5d0e81498f348a",
  measurementId: "G-K53FE7104X"
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom([
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ])]
};