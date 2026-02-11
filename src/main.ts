import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/Routes/app.config';
import { App } from './app/Layout/App/app';
import { ThemeService } from './app/Services/theme.service';

bootstrapApplication(App, appConfig)
  .then((appRef) => {
    const themeService = appRef.injector.get(ThemeService);
    themeService.initTheme();
  })
  .catch((err) => console.error(err));

