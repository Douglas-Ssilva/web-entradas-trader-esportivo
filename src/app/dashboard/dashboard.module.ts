import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {ChartModule} from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { DadosComponent } from './dados/dados.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableModule } from 'primeng/table';
import { TimesLucrativosComponent } from './times-lucrativos/times-lucrativos.component';
import { CampeonatosLucrativosComponent } from './campeonatos-lucrativos/campeonatos-lucrativos.component';



@NgModule({
  declarations: [
    DadosComponent,
    TimesLucrativosComponent,
    CampeonatosLucrativosComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,
    CardModule,
    PanelModule,
    ChartModule,
    ButtonModule,
    TableModule,
    ProgressSpinnerModule,

    DashboardRoutingModule
  ]
})
export class DashboardModule { }
