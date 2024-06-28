import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { EditarComponent } from './editar/editar.component';



const routes : Routes = [
    {
        path : '', component : PesquisaComponent,//configurado lazy load
    },
    {
        path : 'visualizar/:id', component : VisualizarComponent,
    },
    {
        path : 'novo', component : AdicionarComponent,
    },
    {
        path : 'editar/:id', component : EditarComponent,
    },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [RouterModule]
})
export class MetodosRoutingModule {

}
