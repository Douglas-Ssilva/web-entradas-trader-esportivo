import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BancaService } from './../../bancas/banca.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LocalStorageUtils } from 'src/app/utils/local-storage-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private bancaService: BancaService,
    private errorHandlerService : ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  logar(email: string, senha: string) {
    localStorage.setItem('userId', '1')

    this.bancaService.findByPrincipal(LocalStorageUtils.getIdUser())
      .subscribe({
        next: response => this.processarResponse(response),
        error: e => this.processarError(e),
        complete: () => this.processarComplete()
      })

  }

  private processarResponse(response: any) {
    let module = '/bancas';
    if(response.id) {
      localStorage.setItem('bancaId', response.id)
      module = '/campeonatos';
    }
    this.router.navigate([module])
  }

  private processarError(e: any) {
    this.errorHandlerService.handler(e)
    console.error('Erro ao buscar dados', e);
    // this.showSpinner = false//não cai no complete quando dá erro
    // this.loading = false
  }

  private processarComplete() {
    // this.showSpinner = false;
    // this.loading = false
  }

}
