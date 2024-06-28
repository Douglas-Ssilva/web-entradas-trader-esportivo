import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/api';

import { TimeService } from './../time.service';
import { TimeBaseComponent } from '../time-base.component';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.css']
})
export class AdicionarComponent extends TimeBaseComponent implements OnInit {

  @ViewChild('nome') nome!: ElementRef;

  constructor(
    private timeService : TimeService,
    private messageService : MessageService,
    private router : Router,
    private error : ErrorHandlerService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  save(){
    super.prepararEntity();
    this.timeService.save(this.time)
      .subscribe({
        next: () =>  this.processarSucesso(),
        error: e => super.processarError(e, this.error),
        complete: () => this.processarComplete()
      })
  }

  private processarSucesso() {
    this.messageService.add({
      severity: 'success',
      detail: 'Time adicionado com sucesso',
    })
    this.router.navigate(['/times'])
  }

}
