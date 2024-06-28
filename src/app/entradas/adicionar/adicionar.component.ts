import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { EntradaService } from './../entrada.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CampeonatosService } from 'src/app/campeonatos/campeonatos.service';
import { MetodoService } from 'src/app/metodos/metodo.service';
import { EntradaBaseWriteComponent } from '../entradas-base-write.component';
import { Entrada } from '../models/entrada';
import { NgModel } from '@angular/forms';
import { DateUtils } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarComponent extends EntradaBaseWriteComponent implements OnInit {

  entradas : Entrada[] = []
  @ViewChild("campeonato")  fieldCampeonato!: NgModel;
  @ViewChild("metodo")  fieldMetodo!: NgModel;
  @ViewChild("mandante")  fieldMandante!: NgModel;
  @ViewChild("visitante")  fieldVisitante!: NgModel;
  @ViewChild("valor")  fieldValor!: NgModel;
  @ViewChild("odd")  fieldOdd!: NgModel;
  @ViewChild("lucroPrejuizoCorrecao")  fieldLucroPrejuizoCorrecao!: NgModel;

  constructor(
    private entradaService: EntradaService,
    campeonato: CampeonatosService,
    metodo: MetodoService,
    private error: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router,
  ) {
    super(campeonato, metodo, error);
  }

  ngOnInit(): void {

  }


  save() {
    super.prepararEntity()
    this.entradaService.save(this.tratarListEntradas())
      .subscribe({
        next: () => this.processarSucesso(),
        error: e => super.processarError(e, this.error),
        complete: () => this.processarComplete()
      })
  }

  private tratarListEntradas() {
    let entradasAux = [...this.entradas]; //Quando há apenas uma entrada, ao salvar, exibia a tabela
    if (this.entradas.length == 0) {
      entradasAux[0] = this.entrada;
    //Tratamento para casos de já haver uma entrada adicionada na tabela e ele insira novos dados, porém não clica no adicionar mas sim no salvar direto
    } else if(this.entrada.campeonato && this.entrada.metodo && this.entrada.visitanteIdentificador && this.entrada.mandanteIdentificador && this.entrada.lucroPrejuizo){
      entradasAux.push(this.entrada)
    }
    return entradasAux;
  }

  addEntrada() {
    super.prepararEntity()
    if(!this.verificarEntradaDuplicada()) {
      this.entradas.push({...this.entrada})//clone object with spread operator
      this.cleanFields()
    }
  }

  verificarEntradaDuplicada() : boolean {
    let entradaExiste = this.entradas
      .filter(ent => ent.campeonato!.id === this.entrada.campeonato!.id)
      .filter(ent => ent.metodo!.id === this.entrada.metodo!.id)
      .filter(ent => ent.visitanteIdentificador === this.entrada.visitanteIdentificador)
      .filter(ent => ent.mandanteIdentificador === this.entrada.mandanteIdentificador)
      .filter(ent => DateUtils.formatDate(ent.data) === DateUtils.formatDate(this.entrada.data))
      .length > 0

    if(entradaExiste) {
      this.messageService.add({
        severity: 'warn',
        detail: 'Entrada já existe',
      })
    }
    return entradaExiste
  }

   private processarSucesso() {
    this.messageService.add({
      severity: 'success',
      detail: 'Entrada adicionada com sucesso',
    })
    this.
    router.navigate(['/entradas'])
  }

  cleanFields() {
    this.fieldCampeonato.reset()
    this.fieldMetodo.reset()
    this.fieldMandante.reset()
    this.fieldVisitante.reset()
    this.fieldValor.reset()
    this.fieldOdd.reset()
    this.fieldLucroPrejuizoCorrecao.reset()
    this.metodoSelect = undefined
    this.entrada.valor = undefined
    this.entrada.lucroPrejuizo = undefined
    this.entrada.odd = undefined
    this.entrada.golAFavor = false
    this.entrada.golContra = false
    this.entrada.redCard = false
    this.entrada.maisGolsFavor = false
    this.entrada.maisGolsContra = false
    this.entrada.apostaAFavorVisitante = false
    this.entrada.apostaAFavorMandante = false
  }
}


