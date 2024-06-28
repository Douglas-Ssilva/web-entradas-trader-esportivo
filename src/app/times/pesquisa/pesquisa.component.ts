import { Component, OnInit } from '@angular/core';

import { ConfirmEventType, ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { TimeBaseComponent } from '../time-base.component';
import { TimeService } from '../time.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Time } from 'src/app/models/time';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent extends TimeBaseComponent implements OnInit {

  constructor(
    private timeService: TimeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private error: ErrorHandlerService) {
    super();
  }

  ngOnInit(): void {
  }

  findAll(page = 0) {
    this.timeFilter.pagina = page;
    this.showSpinner = true
    this.timeService.findAll(this.timeFilter)
      .subscribe({
        next: response => this.times = this.processarSucessoCollection(response),
        error: e => super.processarError(e, this.error),
        complete: () => super.processarComplete()
      })
  }

  changePage(event: LazyLoadEvent) {
    this.timeFilter.nome = event.globalFilter
    const pageCurrent = event!.first! / event!.rows!;
    this.findAll(pageCurrent);
  }

  delete(t: Time) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir o time: ' + t.nome + '?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.timeService.delete(t)
        .subscribe({
          next: () => this.messageService.add({severity:'info', summary:'Sucesso', detail:'Time excluído com sucesso.'}),
          error: e => super.processarError(e, this.error),
          complete: () => super.processarComplete()
        })

      },
      // reject: (type : ConfirmEventType) => {
      //     switch(type) {
      //         case ConfirmEventType.REJECT:
      //             this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
      //         break;
      //          case ConfirmEventType.CANCEL:
      //              this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
      //          break;
      //     }
      // }
  });

  }

  private processarSucessoCollection(response: any) {
    this.totalRegistros = response.total;
    return response.collection;
  }

}
