import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { DashboardService } from './../dashboard.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MetodoFiltro } from 'src/app/metodos/models/metodo-filter';
import { MetodoDashboard } from '../models/metodo-dashboard';
import { TimeLucrativoDTO } from '../models/time-lucrativo-dto';
import { EntradaDadosGeraisDTO } from '../models/dados-gerais-dashboard';
import { EntradaCampeonatoDTO, EntradaLucroPrejuizoCampeonatosDTO } from '../models/lucro-prejuizo-campeonatos-dashboard';
import { DateUtils } from 'src/app/utils/date-utils';
import { LazyLoadEvent } from 'primeng/api';
import { CampeonatoFiltro } from 'src/app/campeonatos/models/campeonato-filter';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit {

  showSpinner = false
  countRequest = 0
  currentDate = new Date();
  rangeDates: Date[] = [];
  metodos: MetodoDashboard[] = []
  data: any
  totalRegistrosMetodos?: number
  totalRegistrosCampeonato: number = 0
  dadosGerais? : EntradaDadosGeraisDTO
  campeonatoslucroPrejuizo : EntradaCampeonatoDTO[] = []
  filter = new MetodoFiltro()
  campeonatoFilter : CampeonatoFiltro = new CampeonatoFiltro()

  constructor(
    private dashboardService: DashboardService,
    private error: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.tratarRangeDate()

    this.buscarDadosGerais()
    this.buscarMetodos()
    //this.buscarLucroPrejuizoCampeonatos()
  }

  buscarDados() {
    if(this.rangeDates[0] && this.rangeDates[1]) {
      this.countRequest = 0
      this.filter.pagina = 0
      this.buscarDadosGerais()
      this.buscarMetodos()
      this.buscarLucroPrejuizoCampeonatos()
    }
  }

  private buscarLucroPrejuizoCampeonatos(page = 0) {
    this.showSpinner = true
    this.campeonatoFilter.pagina = page
    this.dashboardService.findLucroPrejuizoCampeonatos(this.rangeDates[0], this.rangeDates[1], this.campeonatoFilter)
      .subscribe({
        next: response => this.tratarResponseCampeonato(response),
        error: e => this.processarError(e),
        complete: () => this.processarComplete()
      })
  }

  private tratarResponseCampeonato(response: any): void {
    this.totalRegistrosCampeonato = response.totalElements
    this.campeonatoslucroPrejuizo = response.content;

  }

  changePageCampeonato(event : LazyLoadEvent) {
    const pageCurrent = event!.first! / event!.rows!;
    this.buscarLucroPrejuizoCampeonatos(pageCurrent);
}

  private buscarDadosGerais() {
    this.showSpinner = true
    this.dashboardService.findDadosGerais(this.rangeDates[0], this.rangeDates[1])
      .subscribe({
        next: response => this.tratarResponseDadosGerais(response),
        error: e => this.processarError(e),
        complete: () => this.processarComplete()
      })
  }

  private tratarResponseDadosGerais(response: any): void {
    this.dadosGerais = response;

    if(this.dadosGerais?.dadosGrafico) {
      this.dadosGerais!.dadosGrafico = {
        labels: this.dadosGerais?.dadosGrafico.map((dado : any) => DateUtils.formatDateDiaMes(dado.data)),
        datasets: [
          {
            label : 'Evolução Banca',
            fill: true,
            data: this.dadosGerais?.dadosGrafico.map((dado : any) => dado.total)
          }
        ]
      }
    }
  }

  private buscarMetodos(page = 0) {
    this.showSpinner = true
    this.filter.itensPorPagina = 5
    this.filter.pagina = page

    this.dashboardService.findAllPorEntrada(this.filter, this.rangeDates[0], this.rangeDates[1])
      .subscribe({
        next: response => this.processarSucessoCollectionMetodos(response),
        error: e => this.processarError(e),
        complete: () => this.processarComplete()
      })
  }

  private processarSucessoCollectionMetodos(response: any) {
    this.totalRegistrosMetodos = response.total;
    if(this.consultaIsMaisMetodos()) {
      this.metodos = [...this.metodos, ...response.collection]
    } else {
      this.metodos = response.collection
    }

    this.metodos.forEach(met => {
      met.dataGrafico = {
        labels: met.dadosGrafico.map((dado : any) => DateUtils.formatDateDiaMes(dado.data)),
        datasets: [
          {
            label : met.nome,
            fill: true,
            data: met.dadosGrafico.map((dado : any) => dado.total)
          }
        ]
      }
    })
  }

  private consultaIsMaisMetodos() {
    return this.filter.pagina > 0;
  }

  buscarMaisMetodos() {
    this.buscarMetodos(++this.filter.pagina)
  }


  private tratarRangeDate() {
    this.rangeDates[0] = new Date(this.currentDate.getFullYear(), (this.currentDate.getMonth() - 2), 1);
    this.rangeDates[1] = this.currentDate;
  }

  protected processarError(e: any) {
    this.error.handler(e)
    console.error('Erro ao buscar dados', e);
    this.tratarSpinner();
  }

  protected processarComplete() {
    this.tratarSpinner();
  }

  private tratarSpinner() {
    this.countRequest++
    let buscarMaisMetodos = this.filter.pagina
    if (this.countRequest == 3 || buscarMaisMetodos) {
      this.showSpinner = false;
    }
  }
}
