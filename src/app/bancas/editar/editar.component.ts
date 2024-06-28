import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';

import { BancaBaseComponent } from '../banca-base.component';
import { BancaService } from '../banca.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent extends BancaBaseComponent implements OnInit {

  constructor(
    private bancaService : BancaService,
    private errorHandlerService : ErrorHandlerService,
    private messageService : MessageService,
    private router : Router,
    private activatedRoute : ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.bancaService.findById(this.activatedRoute.snapshot.params['id'])
    .subscribe({
      next: response => this.banca = response,
      error: e => super.processarError(e, this.errorHandlerService),
      complete : () => super.processarComplete()
    })
  }

  edit(){
    this.bancaService.update(this.banca)
      .subscribe({
        next: () =>  this.processarSucesso(),
        error: e => super.processarError(e, this.errorHandlerService),
        complete: () => this.processarComplete()
      })
  }

  private processarSucesso() {
    this.messageService.add({
      severity: 'success',
      detail: 'Banca editada com sucesso',
    })
    this.router.navigate(['/bancas'])
  }


}
