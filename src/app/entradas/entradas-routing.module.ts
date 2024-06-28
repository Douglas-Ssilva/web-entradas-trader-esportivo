import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { EditarComponent } from './editar/editar.component';
import { VisualizarComponent } from './visualizar/visualizar.component';


const routes : Routes = [
    {
        path : '', component : PesquisaComponent,//configurado lazy load
    },
    {
        path : 'novo', component : AdicionarComponent,
    },
    {
        path : 'editar/:id', component : EditarComponent,
    },
    {
        path : 'visualizar/:id', component : VisualizarComponent,
    },


];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class EntradasRoutingModule {

}
