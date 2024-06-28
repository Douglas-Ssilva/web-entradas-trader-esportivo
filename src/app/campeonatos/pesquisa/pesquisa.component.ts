import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { CampeonatosService } from '../campeonatos.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CampeonatoBaseComponent } from '../campeonato-base.component';
import { CampeonatoFiltro } from '../models/campeonato-filter';
import { Campeonato } from '../../models/campeonato';


@Component({
  selector: 'app-campeonatos-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent extends CampeonatoBaseComponent implements OnInit {

  campeonatos : Campeonato[] = [];

  constructor(
    private campeonatosService : CampeonatosService,
    private error : ErrorHandlerService
  ) {
    super()
  }

  ngOnInit(): void {
    //this.findAll();
  }

  findAll(page = 0){
    this.loading = true;
    this.campeonatoFiltro.pagina = page;
    this.showSpinner = true
    this.campeonatosService.findAll(this.campeonatoFiltro)
      .subscribe({
        next: response => this.campeonatos = this.processarSucessoCollection(response),
        error: e => super.processarError(e, this.error),
        complete : () => super.processarComplete()
      })
  }

  private processarSucessoCollection(response : any) {
    this.totalRegistros = response.total;
    return response.collection;
  }

  changePage(event : LazyLoadEvent) {
      this.campeonatoFiltro.nome = event.globalFilter
      const pageCurrent = event!.first! / event!.rows!;
      this.findAll(pageCurrent);
  }

}
