import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map } from 'rxjs';

import { BaseService } from '../services/base.service';
import { MetodoFiltro } from './models/metodo-filter';
import { environment } from 'src/environments/environment';
import { LocalStorageUtils } from '../utils/local-storage-utils';
import { Metodo } from './models/metodo';

@Injectable({
  providedIn: 'root'
})
export class MetodoService extends BaseService {

  constructor(
    private httpClient : HttpClient
  ) {
    super();
  }


  findAll(filter: MetodoFiltro): Observable<any> {
    let params = new HttpParams()
      .set('page', filter.pagina)
      .set('size', filter.itensPorPagina);

    if (filter.nome) {
      params = params.set('nome', filter.nome);
    }

    return this.httpClient.get(this.getUrl(), { params })
    .pipe(
      map(resp => super.extractDataPaginationContent(resp)),
      catchError(super.serviceError));
  }

  findById(id : number): Observable<any> {
    return this.httpClient.get(this.getUrl() +`/${id}`)
      .pipe(
        map(resp => super.extractData(resp)),
        catchError(super.serviceError));
  }


  save(m: Metodo): Observable<Metodo> {
    return this.httpClient.post(this.getUrl(), m)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

  update(m: Metodo): Observable<Metodo> {
    return this.httpClient.put(this.getUrl() + `/${m.id}`, m)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

  private getUrl() {
    return `${environment.apiUrl}/${LocalStorageUtils.getIdBanca()}/metodos`
  }
}
