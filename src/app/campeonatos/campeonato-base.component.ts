import { LazyLoadEvent } from "primeng/api";
import { ErrorHandlerService } from "../core/error-handler.service";
import { Campeonato } from "../models/campeonato";
import { ContinentePaisUtils } from "../utils/continente-pais-utils";
import { CampeonatoFiltro } from "./models/campeonato-filter";

export abstract class CampeonatoBaseComponent {

  protected campeonato : Campeonato = new Campeonato();

  //pagination
  protected totalRegistros = 0;

  protected campeonatoFiltro : CampeonatoFiltro = new CampeonatoFiltro();
  protected continentes : any;
  protected continenteSelect : any;
  protected paisSelect : any;
  protected paisesSelect : any;
  protected paises : any;
  protected pageCurrent! : number
  protected event?: LazyLoadEvent

  protected showSpinner : boolean = false
  protected loading: boolean = false;

  constructor() {
    this.carregarContinentes();
    this.carregarPaises();
  }

  protected processarSucesso(response : any) {
    return response
  }

  protected preencherCamposTela(campeonato : Campeonato) {
    this.campeonato = campeonato;

    this.continenteSelect = this.continentes.find((c : any) => c.name ===  this.campeonato.continente);
    if(this.continenteSelect) {
      this.paisesSelect = this.paises.filter((p: any) => p.continente === this.continenteSelect.value);
      this.paisSelect = this.paisesSelect.find((p : any) => p.name === this.campeonato.pais)
    }
    console.debug(this.paisesSelect);
    console.debug(this.paisSelect);
    console.debug('campeonato -> ', this.campeonato);

  }

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

  protected aoSelecionarContinente() {
    if(this.continenteSelect) {
      this.paisSelect = null
      this.paisesSelect = this.paises.filter((p: any) => p.continente === this.continenteSelect.value);
    }
  }

  protected prepararEntity() {
    this.campeonato.continente = undefined;
    this.campeonato.pais = undefined;
    if(this.continenteSelect) {
      this.campeonato.continente = this.continenteSelect.value;
    }

    if(this.paisSelect) {
      this.campeonato.pais = this.paisSelect.value;
    }
  }

  carregarPaises() {
    this.paises = ContinentePaisUtils.retornarPaises()
  }

  carregarContinentes() {
    this.continentes = ContinentePaisUtils.retornarContinentes()
  }
}
