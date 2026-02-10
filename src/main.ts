import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/Routes/app.config';
import { App } from './app/Layout/App/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
