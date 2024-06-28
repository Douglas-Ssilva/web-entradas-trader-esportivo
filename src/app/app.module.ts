import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoreModule } from './core/core.module';
import { RodapeComponent } from './rodape/rodape.component';
import { SecurityModule } from './security/security.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RodapeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, //app.routing.module
    TabViewModule,
    RouterModule,
    ToastModule,
    AvatarModule,

    HttpClientModule,
    ConfirmDialogModule,

    CoreModule,
    SecurityModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
