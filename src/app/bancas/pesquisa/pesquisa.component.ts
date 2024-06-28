import { BancaService } from './../banca.service';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { BancaBaseComponent } from '../banca-base.component';
import { Banca } from '../models/banca';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent extends BancaBaseComponent implements OnInit {

  bancas : Banca[] = []


  constructor(
    private bancaService : BancaService,
    private route : Router,
    private error : ErrorHandlerService

  ) {
    super();
  }

  ngOnInit(): void {
  }

  findAll(page = 0){
    this.bancaFilter.pagina = page;
    this.showSpinner = true
    this.bancaService.findAll(this.bancaFilter)
      .subscribe({
        next: response => this.bancas = this.processarSucessoCollection(response),
        error: e => super.processarError(e, this.error),
        complete : () => super.processarComplete()
      })
  }

  private processarSucessoCollection(response : any) {
    this.totalRegistros = response.total;
    return response.collection;
  }

  changePage(event : LazyLoadEvent) {
      this.bancaFilter.nome = event.globalFilter
      const pageCurrent = event!.first! / event!.rows!;
      this.findAll(pageCurrent);
  }

  selectBanca(banca : Banca) {
    this.loading = true

    localStorage.setItem('bancaId', banca.id!.toString())
    this.route.navigate(['/campeonatos'])
  }

}
