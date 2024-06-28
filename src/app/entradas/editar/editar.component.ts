import { CampeonatosService } from './../../campeonatos/campeonatos.service';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { EntradaService } from './../entrada.service';
import { EntradaBaseComponent } from '../entradas-base.component';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradaBaseWriteComponent } from '../entradas-base-write.component';
import { MetodoService } from 'src/app/metodos/metodo.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent extends EntradaBaseWriteComponent implements OnInit {

  constructor(
    private entradaService: EntradaService,
    campeonato: CampeonatosService,
    metodo: MetodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private error: ErrorHandlerService
  ) {
    super(campeonato, metodo, error);
  }

  ngOnInit(): void {
    this.entradaService.findById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: response => super.prepararCamposTela(response),
        error: e => super.processarError(e, this.error),
        complete: () => this.processarComplete()
      })
  }

  edit() {
    super.prepararEntity()
    this.entradaService.update(this.entrada)
      .subscribe({
        next: () => this.processarSucesso(),
        error: e => super.processarError(e, this.error),
        complete: () => this.processarComplete()
      })
  }

  private processarSucesso() {
    this.messageService.add({
      severity: 'success',
      detail: 'Entrada editada com sucesso',
    })
    this.router.navigate(['/entradas'])
  }

}
