import { LocalStorageUtils } from 'src/app/utils/local-storage-utils';
import { ErrorHandlerService } from "../core/error-handler.service";
import { Metodo } from "./models/metodo";
import { MetodoFiltro } from "./models/metodo-filter";




export abstract class MetodoBaseComponent {

  //pagination
  protected totalRegistros = 0;

  protected showSpinner : boolean = false
  protected loading: boolean = false;
  protected metodoFiltro : MetodoFiltro = new MetodoFiltro()
  protected metodo : Metodo = new Metodo()

  protected processarError(e : any, error : ErrorHandlerService) {
    error.handler(e)
    console.error('Erro ao buscar dados', e);
    this.showSpinner = false//não cai no complete quando dá erro
    this.loading = false
  }

  protected processarComplete() {
    this.showSpinner = false;
    this.loading = false
  }

}
