import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MetodoBaseComponent } from '../metodos-base.component';
import { LocalStorageUtils } from 'src/app/utils/local-storage-utils';
import { MetodoService } from '../metodo.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent extends MetodoBaseComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private metodoService : MetodoService,
    private error : ErrorHandlerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.metodoService.findById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: response => this.metodo = response,
        error: e => super.processarError(e, this.error),
        complete : () => super.processarComplete()
      })
  }

}
