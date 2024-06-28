import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { CampeonatosService } from '../campeonatos.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CampeonatoBaseComponent } from '../campeonato-base.component';

@Component({
  selector: 'app-campeonatos-cadastro',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarComponent extends CampeonatoBaseComponent implements OnInit {

  constructor(
    private router: Router,
    private campService : CampeonatosService,
    private messageService : MessageService,
    private errorHandlerService : ErrorHandlerService
    ) {
    super();
  }

  ngOnInit(): void {
  }

  save(){
    super.prepararEntity();
    this.campService.save(this.campeonato)
      .subscribe({
        next: () =>  this.processarSucesso(),
        error: e => super.processarError(e, this.errorHandlerService),
        complete: () => this.processarComplete()
      })
  }

  override processarSucesso() {
    this.messageService.add({
      severity: 'success',
      detail: 'Campeonato adicionado com sucesso',
    })
    this.router.navigate(['/campeonatos'])
  }

}
