import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {MessageModule} from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import {ChipsModule} from 'primeng/chips';


import { CampeonatosRoutingModule } from './campeonatos-routing.module';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { EditarComponent } from './editar/editar.component';
import { SharedModule } from '../shared/shared.module';

import { TimesVinculadosComponent } from './times/times-vinculados.component';
import { TimesAVincularComponent } from './times-a-vincular/times-a-vincular.component';




@NgModule({
  declarations: [
    PesquisaComponent,
    AdicionarComponent,
    VisualizarComponent,
    TimesVinculadosComponent,
    EditarComponent,
    TimesAVincularComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CampeonatosRoutingModule,

    ButtonModule,
    TableModule,
    RouterModule,
    FormsModule,
    InputTextModule,
    TooltipModule,
    DropdownModule,
    ProgressSpinnerModule,
    CheckboxModule,
    ChipsModule,

    MessageModule,
    SharedModule,
    RippleModule

  ],
})
export class CampeonatosModule { }
