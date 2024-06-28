import { ErrorHandlerService } from './../../core/error-handler.service';
import { CampeonatosService } from './../campeonatos.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CampeonatoBaseComponent } from '../campeonato-base.component';
import { Campeonato } from '../../models/campeonato';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent extends CampeonatoBaseComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private campeonatosService : CampeonatosService,
    private errorHandlerService : ErrorHandlerService) {
    super();
  }

  ngOnInit(): void {
    this.campeonatosService.findById(this.activatedRoute.snapshot.params['id'])
    .subscribe({
      next: response => super.preencherCamposTela(response),
      error: e => super.processarError(e, this.errorHandlerService),
      complete : () => this.processarComplete()
    })
  }

}
