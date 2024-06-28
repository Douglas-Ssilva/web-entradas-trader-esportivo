import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handler(error : any) {
    console.log(`Error: ${JSON.stringify(error)}`);
    let msg = 'Erro ao acessar o serviço remoto. Tente novamente mais tarde.';

    if (typeof error === 'string') {
        msg = error;
    } else if(error instanceof HttpErrorResponse && error.status >= 400 && error.status <= 499) {
        if(error.error) {
            if(error.error.objects) {
                msg = '';
                error.error.objects.forEach((error : any) => {
                    msg += error.userMessage + "\n";
                })
            } else if(error.error.userMessage) {
                msg = error.error.userMessage;
            } else if(error.error.detail) {
                msg = error.error.detail;
            }
        }
    }

    /* else if(error instanceof RefreshTokenExpired) {
        msg = 'Sua sessão expirou. Por favor, faça o login novamente.';
        localStorage.setItem('token', '');
        // this.route.navigate(['/login']);
        this.oauth.logarAuthorizationCode();
    }*/

    this.messageService.add(
        {
            severity:'error',
            detail: msg
        }
    )
  }
}
