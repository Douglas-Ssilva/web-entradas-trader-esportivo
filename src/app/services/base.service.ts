import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { throwError } from "rxjs";

export abstract class BaseService {

  protected extractData(resp : any) {
    return resp;
  }

  protected extractDataPagination(response : any, list : string) {
    const payload = response['_embedded'];
    const collection = (payload) ? payload[list] : [];
    const total = (response['page']) ? response['page'].totalElements : 0;
    return {
      collection,
      total
    }
  }

  protected extractDataPaginationContent(response : any) {
    const collection = response['content'];
    const total = (response['totalElements']) || 0;
    return {
      collection,
      total
    }
  }

  protected serviceError (resp : Response | any){
    let customError : string[] = [];

    if(resp instanceof HttpErrorResponse) {
      if(resp.statusText === 'Unknown Error') {
        customError.push('Ocorreu um erro desconhecido')
        resp.error.errors = customError;
      } else if(resp.status === 400 && resp.error && resp.error.error == "invalid_grant") {
        customError.push('Usuário ou senha inválidos')
        resp.error.errors = customError;
      }
    }
    console.error(resp.status)
    return throwError(() => resp);
  }
}
