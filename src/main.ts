import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//git Repository : https://github.com/ahk1384/MarketplaceSample.git
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
