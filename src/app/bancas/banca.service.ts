import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map } from 'rxjs';

import { BaseService } from '../services/base.service';
import { BancaFilter } from './models/banca-filter';
import { environment } from 'src/environments/environment';
import { LocalStorageUtils } from '../utils/local-storage-utils';
import { Banca } from './models/banca';

@Injectable({
  providedIn: 'root'
})
export class BancaService extends BaseService {

  constructor(private httpClient : HttpClient) {
    super();
  }

  findAll(filter: BancaFilter): Observable<any> {
    let params = new HttpParams()
      .set('page', filter.pagina)
      .set('size', filter.itensPorPagina);

    if (filter.nome) {
      params = params.set('nome', filter.nome);
    }

    return this.httpClient.get(this.getUrlBanca(), { params })
    .pipe(
      map(resp => super.extractDataPaginationContent(resp)),
      catchError(super.serviceError));
  }

  findById(id : number): Observable<any> {
    return this.httpClient.get(this.getUrlBanca() +`/${id}`)
      .pipe(
        map(resp => super.extractData(resp)),
        catchError(super.serviceError));
  }

  findByIdDetail(id : number): Observable<any> {
    return this.httpClient.get(this.getUrlBanca() + `/${id}/detail`)
      .pipe(
        map(resp => super.extractData(resp)),
        catchError(super.serviceError));
  }

  findByPrincipal(id : string): Observable<any> {
    return this.httpClient.get(this.getUrlBanca() + `/${id}/principal`)
      .pipe(
        map(resp => super.extractData(resp)),
        catchError(super.serviceError));
  }

  save(b: Banca): Observable<Banca> {
    return this.httpClient.post(this.getUrlBanca(), b)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

  update(b: Banca): Observable<Banca> {
    return this.httpClient.put(this.getUrlBanca() + `/${b.id}`, b)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

  private getUrlBanca() : string {
    return `${environment.apiUrl}/${LocalStorageUtils.getIdUser()}/bancas`;
  }
}
