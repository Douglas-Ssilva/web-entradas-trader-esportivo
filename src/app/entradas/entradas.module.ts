import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';

import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { EntradasRoutingModule } from './entradas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { EditarComponent } from './editar/editar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { CoreModule } from '../core/core.module';




@NgModule({
  declarations: [
    PesquisaComponent,
    AdicionarComponent,
    EditarComponent,
    VisualizarComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,

    ProgressSpinnerModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    InputNumberModule,
    AutoCompleteModule,
    RadioButtonModule,
    CalendarModule,

    EntradasRoutingModule,
    SharedModule,

  ]
})
export class EntradasModule { }
