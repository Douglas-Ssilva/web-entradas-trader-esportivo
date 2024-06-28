import { ErrorHandlerService } from "../core/error-handler.service";
import { LocalStorageUtils } from "../utils/local-storage-utils";
import { Banca } from "./models/banca";
import { BancaFilter } from "./models/banca-filter";

export abstract class BancaBaseComponent {

  protected totalRegistros = 0;
  protected showSpinner : boolean = false
  protected loading : boolean = false
  protected bancaFilter : BancaFilter = new BancaFilter()

  protected banca : Banca = new Banca()


  protected processarError(e : any, error : ErrorHandlerService) {
    error.handler(e)
    console.error('Erro ao buscar dados', e);
    this.showSpinner = false//não cai no complete quando dá erro
  }

  protected processarComplete() {
    this.showSpinner = false;
  }


}
