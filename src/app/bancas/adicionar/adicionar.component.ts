import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { BancaBaseComponent } from '../banca-base.component';
import { BancaService } from './../banca.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarComponent extends BancaBaseComponent implements OnInit {

  constructor(
    private bancaService : BancaService,
    private errorHandlerService : ErrorHandlerService,
    private messageService : MessageService,
    private router : Router
  ) {
    super();
  }

  ngOnInit(): void {
  }

  save(){
    this.bancaService.save(this.banca)
      .subscribe({
        next: () =>  this.processarSucesso(),
        error: e => super.processarError(e, this.errorHandlerService),
        complete: () => this.processarComplete()
      })
  }

  private processarSucesso() {
    this.messageService.add({
      severity: 'success',
      detail: 'Banca adicionada com sucesso',
    })
    this.router.navigate(['/bancas'])
  }

}
