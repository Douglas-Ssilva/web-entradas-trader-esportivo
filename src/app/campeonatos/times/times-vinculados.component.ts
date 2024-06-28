import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { Campeonato } from '../../models/campeonato';
import { Time } from 'src/app/models/time';
import { CampeonatoBaseComponent } from '../campeonato-base.component';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CampeonatosService } from '../campeonatos.service';

@Component({
  selector: 'app-times-vinculados',
  templateUrl: './times-vinculados.component.html'
})
export class TimesVinculadosComponent extends CampeonatoBaseComponent implements OnInit, OnChanges {

  @Input()
  override campeonato!: Campeonato

  @Output()
  eventUnselectTime : EventEmitter<Time> = new EventEmitter()

  @Output()
  eventQuantidadeTimesPossoVincular : EventEmitter<number> = new EventEmitter()

  @Input()
  timeAdicionado? : Time

  @Input()
  exibirColumnDesvincularTimes = false

  @ViewChild('campoPesquisa') campoPesquisa!: ElementRef;

  timeASerDesvinculado : Time = new Time()
  times : Time[] = []
  totalRegistrosTimesVinculados = 0;

  constructor(
    private error : ErrorHandlerService,
    private campeonatosService : CampeonatosService) {
    super();
  }

  //detecta alterações nas propriedade de entrada de um componente. @Input()
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['timeAdicionado'] && changes['timeAdicionado'].currentValue && changes['timeAdicionado'].currentValue.id) {
      this.times.push(changes['timeAdicionado'].currentValue);
      this.totalRegistrosTimesVinculados++
      this.eventQuantidadeTimesPossoVincular.emit(this.buscarTotalTimesQueAindaPossoVincular())
    }

    if(changes['campeonato'] && changes['campeonato'].currentValue && changes['campeonato'].currentValue.id) {
      this.findAll()
    }
  }

  ngOnInit(): void {
  }


  changePage(event : LazyLoadEvent) {
    if(this.campeonato.id) {
      this.campeonatoFiltro.nomeTime = event.globalFilter
      this.pageCurrent = event!.first! / event!.rows!;
      this.findAll(this.pageCurrent);
    }
  }

  findAll(page = 0){
    this.campeonatoFiltro.pagina = page;
    this.showSpinner = true
    this.campeonatoFiltro.campeonatoId = this.campeonato.id
    this.campeonatoFiltro.itensPorPagina = 10
    this.campeonatosService.findTimes(this.campeonatoFiltro)
      .subscribe({
        next: response => this.processarSucessoCollectionTimesVinculados(response),
        error: e => super.processarError(e, this.error),
        complete : () => super.processarComplete()
      })
  }

  private processarSucessoCollectionTimesVinculados(response : any) {
    this.totalRegistrosTimesVinculados = response.total;
    this.times = response.collection;
    this.eventQuantidadeTimesPossoVincular.emit(this.buscarTotalTimesQueAindaPossoVincular())
  }

  private buscarTotalTimesQueAindaPossoVincular() {
    return this.campeonato.totalTimes ? this.campeonato.totalTimes - this.totalRegistrosTimesVinculados : undefined
  }

  unselectTime(time : Time) {
    this.timeASerDesvinculado = time
    this.loading = true
    this.campeonatosService.desvincularTime(this.campeonato, time)
    .subscribe({
      next: () => this.enviarTimeParaComponenteTimesAVinculados(time),
      error: e => super.processarError(e, this.error),
      complete : () => this.loading = false
    })
  }

  private enviarTimeParaComponenteTimesAVinculados(time : Time) {
    const index = this.times.findIndex((t) => t.id === time.id);
    this.times.splice(index, 1)
    this.totalRegistrosTimesVinculados--
    this.eventUnselectTime.emit(time)
    const qtdeTimesAVincular = this.campeonato.totalTimes ? this.campeonato.totalTimes - this.totalRegistrosTimesVinculados : 0;
    this.eventQuantidadeTimesPossoVincular.emit(qtdeTimesAVincular)
    if(this.times.length == 0) {
      //table.reset() is there bug and not working
      this.campoPesquisa.nativeElement.value = ''
      this.campeonatoFiltro.nomeTime = this.campoPesquisa.nativeElement.value

      if(this.pageCurrent > 1) {
        this.pageCurrent--
        this.findAll(this.pageCurrent)
      }
    }
    this.findAll(this.pageCurrent)
  }

}
