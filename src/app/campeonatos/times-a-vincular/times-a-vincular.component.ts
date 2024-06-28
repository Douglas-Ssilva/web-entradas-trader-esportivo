import { TimeService } from './../../times/time.service';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { CampeonatosService } from './../campeonatos.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CampeonatoBaseComponent } from '../campeonato-base.component';
import { Campeonato } from 'src/app/models/campeonato';
import { Time } from 'src/app/models/time';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap, throwError } from 'rxjs';
import { TimeFiltro } from 'src/app/times/models/time-filter';

@Component({
  selector: 'app-times-a-vincular',
  templateUrl: './times-a-vincular.component.html'
})
export class TimesAVincularComponent extends CampeonatoBaseComponent implements OnChanges {

  @Input()
  override campeonato!: Campeonato

  @Input()
  timeRemovido?: Time

  @Input()
  possoAddMaisTimes: boolean = true

  @Input()
  quantidadeTimesPossoVincular : number = 0

  @Output()
  eventSelectedTimes: EventEmitter<Time[]> = new EventEmitter()

  @Output()
  eventTimeSelecionado: EventEmitter<Time> = new EventEmitter()

  @ViewChild('campoPesquisa') campoPesquisa!: ElementRef;

  selectedTimes: Time[] = []
  timesAVincular: Time[] = []
  timeASerVinculado: Time = new Time()
  totalRegistrosTimesAVincular = 0;

  constructor(
    private campeonatosService: CampeonatosService,
    private error: ErrorHandlerService,
    private timeService : TimeService,
    private messageService: MessageService,

    ) {
    super();
  }

  //detecta alterações nas propriedade de entrada de um componente. @Input()
  ngOnChanges(changes: SimpleChanges): void {
    console.debug('changes ->', changes);

    if (changes['timeRemovido'] && changes['timeRemovido'].currentValue && changes['timeRemovido'].currentValue.id) {
      if (this.timesAVincular.length == 0) {//Endpoint não retorna times caso quantidade deles seja igual a quantidade de times vinculados
        this.findAll()
      } else {
        this.timesAVincular.push(changes['timeRemovido'].currentValue)
        this.totalRegistrosTimesAVincular++
      }
    }

    if (changes['campeonato'] && changes['campeonato'].currentValue && changes['campeonato'].currentValue.id) {
      this.findAll()
    }
  }

  findAll(page = 0) {
    this.campeonatoFiltro.pagina = page;
    this.showSpinner = true
    this.campeonatoFiltro.campeonatoId = this.campeonato.id
    this.campeonatoFiltro.itensPorPagina = 10
    this.campeonatosService.findTimesElegiveis(this.campeonatoFiltro)
      .subscribe({
        next: response => this.processarSucessoCollectionTimesAVincular(response),
        error: e => super.processarError(e, this.error),
        complete: () => super.processarComplete()
      })
  }

  private processarSucessoCollectionTimesAVincular(response: any) {
    this.totalRegistrosTimesAVincular = response.total;
    this.timesAVincular = response.collection;

  }

  changePage(event: LazyLoadEvent) {
    if (this.campeonato.id) {
      this.event = event
      this.campeonatoFiltro.nomeTime = event.globalFilter
      this.pageCurrent = event!.first! / event!.rows!;
      this.findAll(this.pageCurrent);
    }
  }

  selectTime(time: Time) {
    this.timeASerVinculado = time
    this.loading = true
    if (this.possoAdicionarMaisTimes()) {
      this.campeonatosService.vincularTime(this.campeonato, time)
        .subscribe({
          next: () => this.enviarTimeParaComponenteTimesVinculados(time),
          error: e => super.processarError(e, this.error),
          complete: () => this.loading = false
        })
    } else {
      this.messageService.add(
        {
          severity: 'error',
          detail: `O time ${time.nome} não pode ser adicionado pois o campeonato ${this.campeonato.nome} já está com o máximo de times vinculados`
        }
      )
      this.loading = false
    }
  }

  private possoAdicionarMaisTimes() {
    return this.quantidadeTimesPossoVincular == undefined || this.quantidadeTimesPossoVincular > 0;
  }

  private enviarTimeParaComponenteTimesVinculados(time: Time) {
    const index = this.timesAVincular.findIndex((t) => t.id === time.id);
    this.timesAVincular.splice(index, 1)
    this.eventTimeSelecionado.emit(time)
    if(this.timesAVincular.length == 0) {
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
