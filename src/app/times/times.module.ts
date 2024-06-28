import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {ChipsModule} from 'primeng/chips';

import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { TimesRoutingModule } from './times-routing.module';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { SharedModule } from '../shared/shared.module';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { EditarComponent } from './editar/editar.component';



@NgModule({
  declarations: [
    PesquisaComponent,
    AdicionarComponent,
    VisualizarComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    ProgressSpinnerModule,
    TableModule,
    InputTextModule,
    TooltipModule,
    ButtonModule,
    DropdownModule,
    ChipsModule,

    TimesRoutingModule,
    SharedModule
  ]
})
export class TimesModule { }
