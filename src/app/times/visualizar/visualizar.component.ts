import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TimeBaseComponent } from '../time-base.component';
import { TimeService } from '../time.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Time } from 'src/app/models/time';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent extends TimeBaseComponent implements OnInit {

  constructor(
    private timeService : TimeService,
    private activatedRoute : ActivatedRoute,
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

}
