import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { BaseService } from '../services/base.service';
import { TimeFiltro } from './models/time-filter';
import { Time } from '../models/time';

@Injectable({
  providedIn: 'root'
})
export class TimeService extends BaseService {

  timesUrl = `${environment.apiUrl}/times`;

  constructor(private http: HttpClient) {
    super();
  }

  findAll(filter: TimeFiltro): Observable<any> {
    let params = new HttpParams()
      .set('page', filter.pagina)
      .set('size', filter.itensPorPagina)
      .set('sort', 'nome')

    if (filter.nome) {
      params = params.set('nome', filter.nome);
    }

    return this.http.get(`${this.timesUrl}`, { params })
    .pipe(
      map(resp => super.extractDataPagination(resp, 'times')),
      catchError(super.serviceError));
  }

  findById(id: number): Observable<Time> {
    return this.http.get<Time>(`${this.timesUrl}/${id}`)
    .pipe(
      map(resp => super.extractData(resp)),
      catchError(super.serviceError));
  }

  save(t: Time): Observable<Time> {
    return this.http.post(`${this.timesUrl}`, t)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

  update(t: Time): Observable<Time> {
    return this.http.put(`${this.timesUrl}/${t.id}`, t)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }

  delete(t: Time): Observable<void> {
    return this.http.delete(`${this.timesUrl}/${t.id}`)
      .pipe(
        map(super.extractData),
        catchError(super.serviceError)
      )
  }
}
