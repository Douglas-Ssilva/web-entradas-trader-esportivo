import { MetodoService } from './../metodos/metodo.service';
import { CampeonatosService } from './../campeonatos/campeonatos.service';
import { ErrorHandlerService } from "../core/error-handler.service";
import { EntradaBaseComponent } from "./entradas-base.component";
import { CampeonatoFiltro } from '../campeonatos/models/campeonato-filter';
import { MetodoFiltro } from '../metodos/models/metodo-filter';


export abstract class EntradaBaseWriteComponent extends EntradaBaseComponent {

  constructor(
    private campeonatoService : CampeonatosService,
    private metodoService : MetodoService,
    private errorHandlerService: ErrorHandlerService) {
      super();
  }

  protected filterCampeonatos(event: any) {
    let filter = new CampeonatoFiltro()
    filter.nome = event.query

    this.campeonatoService.findAll(filter)
      .subscribe({
        next: (response) => this.processarSucessoCampeonato(response),
        error: e => super.processarError(e, this.errorHandlerService),
        complete: () => this.processarComplete()
      });
  }

  protected filterTimes(event: any) {
    let filter = new CampeonatoFiltro()
    filter.nomeTime = event.query
    filter.campeonatoId = this.campeonatoSelect?.value

    this.campeonatoService.findTimesCandidatos(filter)
      .subscribe({
        next: (response) => this.processarSucessoTimes(response),
        error: e => super.processarError(e, this.errorHandlerService),
        complete: () => this.processarComplete()
      });
  }

  filterMetodos(event: any) {
    let filter = new MetodoFiltro()
    filter.nome = event.query
    this.metodoService.findAll(filter)
      .subscribe({
        next: response => this.processarSucessoMetodos(response),
        error: e => super.processarError(e, this.errorHandlerService),
        complete: () => super.processarComplete()
      })
  }

  protected tratarCampoLucroPrejuizoGolFavor() {
    if(!this.entrada.golAFavor) {
      this.entrada.maisGolsContra = false
      this.entrada.maisGolsFavor = false
    }
  }

  protected tratarCampoLucroPrejuizoGolContra() {
    if(!this.entrada.golContra) {
      this.entrada.maisGolsContra = false
      this.entrada.maisGolsFavor = false
    }
  }

  private processarSucessoMetodos(response: any) {
    this.filteredMetodos = this.tratarResponseMetodo(response)
  }

  private tratarResponseMetodo(response: any) {
    return response.collection.map((e: any) => {
      return {
        label: e.nome,
        value: e.id,
        stakeDefault : e.stakeDefault,
        exigirPreenchimentoFlagMandanteVisitante : e.exigirPreenchimentoFlagMandanteVisitante,
        exigirPreenchimentoFlagGolContraFavor : e.exigirPreenchimentoFlagGolContraFavor,
        exigirPreenchimentoFlagRedCard : e.exigirPreenchimentoFlagRedCard
      };
    });
  }

  private processarSucessoCampeonato(response: any) {
    this.filteredCampeonatos = this.tratarResponse(response)
  }

  private processarSucessoTimes(response: any) {
    this.filteredMandante = this.tratarResponse(response)
    this.filteredVisitante = this.tratarResponse(response)
    this.tratarTimesJaSelecionados();
  }
}
