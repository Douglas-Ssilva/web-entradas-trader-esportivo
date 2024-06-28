import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Observable, catchError, map } from 'rxjs';

import { MetodoFiltro } from '../metodos/models/metodo-filter';
import { BaseService } from '../services/base.service';
import { environment } from 'src/environments/environment';
import { LocalStorageUtils } from '../utils/local-storage-utils';
import { CampeonatoFiltro } from '../campeonatos/models/campeonato-filter';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {

  constructor(
    private httpClient : HttpClient,
    private datePipe : DatePipe
  ) {
    super();
  }

  findLucroPrejuizoCampeonatos(dateInicio : Date, dateFim : Date, campeonatoFilter : CampeonatoFiltro): Observable<any> {
    let dataInicio = this.datePipe.transform(dateInicio, 'yyyy-MM-dd');
    let dataFim = this.datePipe.transform(dateFim, 'yyyy-MM-dd');


    let params = new HttpParams()

    params = params
    .set('page', campeonatoFilter.pagina)
    .set('size', campeonatoFilter.itensPorPagina);

    if(dataInicio && dataFim) {
      params = params
        .set('dataInicio', dataInicio)
        .set('dataFim', dataFim);
    }

    return this.httpClient.get(this.getUrl() + '/lucro-prejuizo-campeonatos', { params })
    .pipe(
      map(resp => super.extractData(resp)),
      catchError(super.serviceError));
  }

  findDadosGerais(dateInicio : Date, dateFim : Date): Observable<any> {
    let dataInicio = this.datePipe.transform(dateInicio, 'yyyy-MM-dd');
    let dataFim = this.datePipe.transform(dateFim, 'yyyy-MM-dd');

    let params = new HttpParams()
    if(dataInicio && dataFim) {
      params = params
        .set('dataInicio', dataInicio)
        .set('dataFim', dataFim);
    }

    return this.httpClient.get(this.getUrl() + '/dados-gerais', { params })
    .pipe(
      map(resp => super.extractData(resp)),
      catchError(super.serviceError));
  }

  findAllPorEntrada(filter: MetodoFiltro, dateInicio : Date, dateFim : Date): Observable<any> {
    let dataInicio = this.datePipe.transform(dateInicio, 'yyyy-MM-dd');
    let dataFim = this.datePipe.transform(dateFim, 'yyyy-MM-dd');

    let params = new HttpParams()
      .set('page', filter.pagina)
      .set('size', filter.itensPorPagina);

    if(dataInicio && dataFim) {
      params = params
        .set('dataInicio', dataInicio)
        .set('dataFim', dataFim);
    }

    return this.httpClient.get(this.getUrl() + '/total-entradas-metodos', { params })
    .pipe(
      map(resp => super.extractDataPaginationContent(resp)),
      catchError(super.serviceError));
  }

  private getUrl() {
    return `${environment.apiUrl}/${LocalStorageUtils.getIdBanca()}/dashboard`
  }
}
