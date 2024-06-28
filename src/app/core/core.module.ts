import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ErrorHandlerService } from './error-handler.service';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
      ErrorHandlerService,
      DatePipe,
      ]
})
export class CoreModule { }
