import { TimeFiltro } from "./models/time-filter";
import { ErrorHandlerService } from "../core/error-handler.service";
import { Time } from "../models/time";
import { ContinentePaisUtils } from "../utils/continente-pais-utils";

export abstract class TimeBaseComponent {

  protected totalRegistros = 0;
  protected times : Time[] = []
  protected time : Time = new Time()
  protected timeFilter : TimeFiltro = new TimeFiltro()
  protected showSpinner : boolean = false
  protected globalFilter = ''

  protected continentes : any;
  protected continenteSelect : any;
  protected paisSelect : any;
  protected paisesSelect : any;
  protected paises : any;

  constructor() {
    this.carregarContinentes();
    this.carregarPaises();
  }

  carregarPaises() {
    this.paises = ContinentePaisUtils.retornarPaises()
  }

  carregarContinentes() {
    this.continentes = ContinentePaisUtils.retornarContinentes()
  }

  protected processarError(e : any, error : ErrorHandlerService) {
    error.handler(e)
    console.error('Erro ao buscar dados', e);
    this.showSpinner = false//não cai no complete quando dá erro
  }

  protected processarComplete() {
    this.showSpinner = false;
  }

  protected aoSelecionarContinente() {
    if(this.continenteSelect) {
      this.paisSelect = null //NG0100: ExpressionChangedAfterItHasBeenCheckedError
      this.paisesSelect = this.paises.filter((p: any) => p.continente === this.continenteSelect.value);
    }
  }

  protected prepararEntity() {
    this.time.continente = undefined;
    this.time.pais = undefined;
    if(this.continenteSelect) {
      this.time.continente = this.continenteSelect.value;
    }

    if(this.paisSelect) {
      this.time.pais = this.paisSelect.value;
    }
  }

  protected preencherCamposTela(time : Time) {
    this.time = time;

    this.continenteSelect = this.continentes.find((c : any) => c.name ===  this.time.continente);
    if(this.continenteSelect) {
      this.paisesSelect = this.paises.filter((p: any) => p.continente === this.continenteSelect.value);
      this.paisSelect = this.paisesSelect.find((p : any) => p.name === this.time.pais)
    }
  }
}
