import { EntradaService } from './../entrada.service';
import { Component, OnInit } from '@angular/core';
import { EntradaBaseComponent } from '../entradas-base.component';
import { Entrada } from '../models/entrada';
import { LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent extends EntradaBaseComponent implements OnInit {

  entradas : Entrada[] = []

  constructor(
    private entradaService : EntradaService,
    private error : ErrorHandlerService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  findAll(page = 0){
    this.entradaFiltro.pagina = page;
    //this.showSpinner = true
    this.entradaService.findAll(this.entradaFiltro)
      .subscribe({
        next: response => this.entradas = this.processarSucessoCollection(response),
        error: e => super.processarError(e, this.error),
        complete : () => super.processarComplete()
      })
  }

  private processarSucessoCollection(response : any) {
    this.totalRegistros = response.total;
    return response.collection;
  }

  changePage(event : LazyLoadEvent) {
      const pageCurrent = event!.first! / event!.rows!;
      this.findAll(pageCurrent);
  }

}
