import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

import { MetodoService } from './../metodo.service';
import { MetodoBaseComponent } from '../metodos-base.component';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarComponent extends MetodoBaseComponent implements OnInit {

  constructor(
    private metodoService : MetodoService,
    private errorHandlerService : ErrorHandlerService,
    private messageService : MessageService,
    private router : Router
  ) {
    super();
  }

  ngOnInit(): void {
  }

  save(){
    this.metodoService.save(this.metodo)
      .subscribe({
        next: () =>  this.processarSucesso(),
        error: e => super.processarError(e, this.errorHandlerService),
        complete: () => this.processarComplete()
      })
  }

  private processarSucesso() {
    this.messageService.add({
      severity: 'success',
      detail: 'Método adicionado com sucesso',
    })
    this.router.navigate(['/metodos'])
  }

}
