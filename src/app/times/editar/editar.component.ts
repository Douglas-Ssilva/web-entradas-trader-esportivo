import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { TimeBaseComponent } from '../time-base.component';
import { TimeService } from '../time.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent extends TimeBaseComponent implements OnInit {

  constructor(
    private timeService : TimeService,
    private activatedRoute : ActivatedRoute,
    private messageService : MessageService,
    private router : Router,
    private error : ErrorHandlerService) {
    super();
  }

  ngOnInit(): void {
    this.timeService.findById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: resp =>  super.preencherCamposTela(resp),
        error: e => super.processarError(e, this.error),
        complete: () => this.processarComplete()
      })
  }

  edit(){
    super.prepararEntity();
    this.timeService.update(this.time)
      .subscribe({
        next: () =>  this.processarSucesso(),
        error: e => super.processarError(e, this.error),
        complete: () => this.processarComplete()
      })
  }

  private processarSucesso() {
    this.messageService.add({
      severity: 'success',
      detail: 'Time editado com sucesso',
    })
    this.router.navigate(['/times'])
  }

}
