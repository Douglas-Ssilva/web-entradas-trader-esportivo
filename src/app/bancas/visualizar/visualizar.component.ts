import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { BancaService } from './../banca.service';
import { BancaBaseComponent } from '../banca-base.component';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent extends BancaBaseComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private bancaService : BancaService,
    private error : ErrorHandlerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.bancaService.findByIdDetail(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: response => this.banca = response,
        error: e => super.processarError(e, this.error),
        complete : () => super.processarComplete()
      })
  }

}
