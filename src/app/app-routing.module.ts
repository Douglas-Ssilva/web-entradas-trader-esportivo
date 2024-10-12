import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes : Routes = [
  //lazy load
  { path : '', loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path : 'dashboard', loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path : 'campeonatos', loadChildren: () => import('../app/campeonatos/campeonatos.module').then(m => m.CampeonatosModule) },
  { path : 'times', loadChildren: () => import('../app/times/times.module').then(m => m.TimesModule) },
  { path : 'bancas', loadChildren: () => import('../app/bancas/bancas.module').then(m => m.BancasModule) },
  { path : 'metodos', loadChildren: () => import('../app/metodos/metodos.module').then(m => m.MetodosModule) },
  { path : 'entradas', loadChildren: () => import('../app/entradas/entradas.module').then(m => m.EntradasModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
