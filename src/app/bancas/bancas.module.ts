import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import {CardModule} from 'primeng/card';

import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { BancasRoutingModule } from './bancas-routing.module';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { SharedModule } from '../shared/shared.module';
import { EditarComponent } from './editar/editar.component';




@NgModule({
  declarations: [
    PesquisaComponent,
    VisualizarComponent,
    AdicionarComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    ProgressSpinnerModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    CheckboxModule,
    InputNumberModule,
    CardModule,

    BancasRoutingModule,
    SharedModule,
  ]
})
export class BancasModule { }
