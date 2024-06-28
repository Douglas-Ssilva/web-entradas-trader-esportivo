import { TimesVinculadosComponent } from './../times/times-vinculados.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/api';

import { CampeonatosService } from './../campeonatos.service';
import { CampeonatoBaseComponent } from '../campeonato-base.component';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Time } from 'src/app/models/time';
import { TimesAVincularComponent } from '../times-a-vincular/times-a-vincular.component';
import { Campeonato } from 'src/app/models/campeonato';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent extends CampeonatoBaseComponent implements OnInit {

  @ViewChild(TimesAVincularComponent) timesAVincularComponent! : TimesAVincularComponent

  quantidadeTimesPossoVincular : number = 0
  timeAdicionado? : Time
  timeRemovido? : Time

  constructor(
    private campeonatosService: CampeonatosService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private messageService : MessageService,
    private errorHandlerService: ErrorHandlerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.campeonatosService.findById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: response => this.preencherCamposTela(response),
        error: e => super.processarError(e, this.errorHandlerService),
        complete: () => this.processarComplete()
      })
  }

  override preencherCamposTela(campeonato : Campeonato) {
    super.preencherCamposTela(campeonato)
  }

  edit() {
    this.showSpinner = true
    super.prepararEntity();
    this.campeonatosService.edit(this.campeonato)
    .subscribe({
      next: () =>  this.processarSucesso(),
      error: e => super.processarError(e, this.errorHandlerService),
      complete: () => this.processarComplete()
    })
  }


  override processarSucesso() {
    this.messageService.add({
      severity: 'success',
      detail: 'Campeonato editado com sucesso',
    })
    this.router.navigate(['/campeonatos'])
  }

  saveTimesSelecionados(times : Time[]) {
    console.log(times);
  }

  addTime(time : Time) {
    this.timeAdicionado = time
  }

  removeTime(time : Time) {
    this.timeRemovido = time
  }

  quantidadeTimesPodeVincular(qtdeTimes : number) {
    this.quantidadeTimesPossoVincular = qtdeTimes
  }


}
