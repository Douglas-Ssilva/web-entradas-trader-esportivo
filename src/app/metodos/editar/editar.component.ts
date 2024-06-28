import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';

import { MetodoBaseComponent } from '../metodos-base.component';
import { MetodoService } from '../metodo.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent extends MetodoBaseComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private metodoService: MetodoService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.metodoService.findById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: response => this.metodo = response,
        error: e => super.processarError(e, this.errorHandlerService),
        complete: () => super.processarComplete()
      })
  }


  edit() {
    this.metodoService.update(this.metodo)
      .subscribe({
        next: () => this.processarSucesso(),
        error: e => super.processarError(e, this.errorHandlerService),
        complete: () => this.processarComplete()
      })
  }

  private processarSucesso() {
    this.messageService.add({
      severity: 'success',
      detail: 'Método editado com sucesso',
    })
    this.router.navigate(['/metodos'])
  }

}
