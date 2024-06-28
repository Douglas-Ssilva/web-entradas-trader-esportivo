import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntradaBaseComponent } from '../entradas-base.component';
import { EntradaService } from '../entrada.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent extends EntradaBaseComponent implements OnInit {

  constructor(
    private entradaService : EntradaService,
    private activatedRoute : ActivatedRoute,
    private error : ErrorHandlerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.entradaService.findById(this.activatedRoute.snapshot.params['id'])
    .subscribe({
      next: response => super.prepararCamposTela(response),
      error: e => super.processarError(e, this.error),
      complete: () => this.processarComplete()
    })
  }

}
