import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';


import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { MetodosRoutingModule } from './metodos-routing.module';
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

    ProgressSpinnerModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    CheckboxModule,
    InputNumberModule,

    MetodosRoutingModule,
    SharedModule
  ]
})
export class MetodosModule { }
