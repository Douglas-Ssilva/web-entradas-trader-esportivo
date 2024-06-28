import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { CampeonatoFiltro } from './models/campeonato-filter';
import { Observable, catchError, map } from 'rxjs';
import { Campeonato } from '../models/campeonato';
import { BaseService } from '../services/base.service';
import { Time } from '../models/time';

@Injectable({
  providedIn: 'root'
})
export class CampeonatosService extends BaseService {

  campeonatosUrl = `${environment.apiUrl}/campeonatos`;

  constructor(private http: HttpClient) {
    super();
  }

  findById(id: number): Observable<Campeonato> {
    return this.http
      .get<Campeonato>(`${this.campeonatosUrl}/${id}`)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError));
  }

  findAll(filter: CampeonatoFiltro): Observable<any> {
    let params = new HttpParams()
      .set('page', filter.pagina)
      .set('size', filter.itensPorPagina);

    if (filter.nome) {
      params = params.set('nome', filter.nome);
    }

    return this.http.get(`${this.campeonatosUrl}`, { params })
    .pipe(
      map(resp => super.extractDataPagination(resp, 'campeonatos')),
      catchError(super.serviceError));
  }

  save(c: Campeonato): Observable<Campeonato> {
    return this.http.post(`${this.campeonatosUrl}`, c)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

  edit(c: Campeonato): Observable<Campeonato> {
    return this.http.put(`${this.campeonatosUrl}/${c.id}`, c)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

  delete(c: Campeonato) : Observable<Campeonato> {
    return this.http.delete<Campeonato>(`${this.campeonatosUrl}/${c.id}`)
    .pipe(
      catchError(super.serviceError)
      );
  }

  findTimes(filter: CampeonatoFiltro): Observable<any> {
    let params = new HttpParams()
    .set('page', filter.pagina)
    .set('size', filter.itensPorPagina);

    if(filter.nomeTime) {
      params = params.set('nome', filter.nomeTime)
    }

  return this.http.get(`${this.campeonatosUrl}/${filter.campeonatoId}/times`, { params })
  .pipe(
    map(resp => super.extractDataPagination(resp, 'times')),
    catchError(super.serviceError));
  }

  findTimesCandidatos(filter: CampeonatoFiltro): Observable<any> {
    let params = new HttpParams()
    .set('page', filter.pagina)
    .set('size', filter.itensPorPagina);

    if(filter.nomeTime) {
      params = params.set('nome', filter.nomeTime)
    }

  return this.http.get(`${this.campeonatosUrl}/${filter.campeonatoId}/timesCandidatos`, { params })
  .pipe(
    map(resp => super.extractDataPagination(resp, 'times')),
    catchError(super.serviceError));
  }

  findTimesElegiveis(filter: CampeonatoFiltro): Observable<any> {
    let params = new HttpParams()
    .set('page', filter.pagina)
    .set('size', filter.itensPorPagina);

    if(filter.nomeTime) {
      params = params.set('nome', filter.nomeTime)
    }

  return this.http.get(`${this.campeonatosUrl}/${filter.campeonatoId}/timesElegiveis`, { params })
  .pipe(
    map(resp => super.extractDataPagination(resp, 'times')),
    catchError(super.serviceError));
  }

  vincularTime(campeonato : Campeonato, time : Time) : Observable<any> {
    return this.http.put(`${this.campeonatosUrl}/${campeonato.id}/times/${time.id}`, {})
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

  desvincularTime(campeonato : Campeonato, time : Time) : Observable<any> {
    return this.http.delete(`${this.campeonatosUrl}/${campeonato.id}/times/${time.id}`)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

}
