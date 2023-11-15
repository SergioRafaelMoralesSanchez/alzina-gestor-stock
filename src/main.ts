import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { environment } from "./environments/environment";

const firebaseConfig = environment.firebaseConfig;

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
