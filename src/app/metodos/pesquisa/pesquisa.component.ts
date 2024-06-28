import { MetodoService } from './../metodo.service';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { MetodoBaseComponent } from '../metodos-base.component';
import { Metodo } from '../models/metodo';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent extends MetodoBaseComponent implements OnInit {

  metodos : Metodo[] = []

  constructor(
    private metodoService : MetodoService,
    private error : ErrorHandlerService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  findAll(page = 0){
    this.metodoFiltro.pagina = page;
    this.showSpinner = true
    this.metodoService.findAll(this.metodoFiltro)
      .subscribe({
        next: response => this.metodos = this.processarSucessoCollection(response),
        error: e => super.processarError(e, this.error),
        complete : () => super.processarComplete()
      })
  }

  private processarSucessoCollection(response : any) {
    this.totalRegistros = response.total;
    return response.collection;
  }

  changePage(event : LazyLoadEvent) {
      this.metodoFiltro.nome = event.globalFilter
      const pageCurrent = event!.first! / event!.rows!;
      this.findAll(pageCurrent);
  }

}
