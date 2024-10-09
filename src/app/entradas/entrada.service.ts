import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map } from 'rxjs';

import { BaseService } from '../services/base.service';
import { EntradaFiltro } from './models/entrada-filter';
import { LocalStorageUtils } from '../utils/local-storage-utils';
import { Entrada } from './models/entrada';

@Injectable({
  providedIn: 'root'
})
export class EntradaService extends BaseService {

  constructor(
    private httpClient : HttpClient
  ) {
    super();
  }


  findAll(filter: EntradaFiltro): Observable<any> {
    let params = new HttpParams()
      .set('page', filter.pagina)
      .set('size', filter.itensPorPagina);

      if(filter.metodoId) {
        params = params.set('metodoId', filter.metodoId)
      }

    return this.httpClient.get(this.getUrl(), { params })
    .pipe(
      map(resp => super.extractDataPaginationContent(resp)),
      catchError(super.serviceError));
  }

  findById(id: number): Observable<Entrada> {
    return this.httpClient
      .get<Entrada>(`${this.getUrl()}/${id}`)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }


  save(e: Entrada[]): Observable<Entrada> {
    return this.httpClient.post(this.getUrl(), e)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

  update(e: Entrada): Observable<Entrada> {
    return this.httpClient.put(`${this.getUrl()}/${e.id}`, e)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

  private getUrl() {
    return `${environment.apiUrl}/${LocalStorageUtils.getIdBanca()}/entradas`
  }
}
