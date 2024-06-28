
import { ErrorHandlerService } from "../core/error-handler.service";
import { Campeonato } from "../models/campeonato";
import { Entrada } from "./models/entrada";
import { EntradaFiltro } from "./models/entrada-filter";
import { MetodoDropdown } from "./models/metodo-dropdown";
import { Dropdown } from "../models/dropdown";
import { MetodoDTO } from "../models/metodo-dto";
import { EntityDTO } from "../models/entity-auto-complete-dto";
import { DateUtils } from "../utils/date-utils";
import { CampeonatoDTO } from "../models/campeonato-dto";



export abstract class EntradaBaseComponent {

  //pagination
  protected totalRegistros = 0;
  protected showSpinner : boolean = true
  protected loading? : boolean

  protected entradaFiltro : EntradaFiltro = new EntradaFiltro()
  protected entrada : Entrada = new Entrada()

  protected campeonatos : Campeonato[] = []
  protected filteredCampeonatos : Dropdown[] = [];
  protected filteredMetodos : MetodoDropdown[] = [];
  protected filteredMandante : Dropdown[] = [];
  protected filteredVisitante :Dropdown[] = [];
  protected metodoSelect? : MetodoDropdown
  protected campeonatoSelect? : Dropdown
  protected mandanteSelect? : Dropdown
  protected visitanteSelect? : Dropdown
  protected apostaAFavor?: string;
  protected dateField = new Date()



  protected processarError(e : any, error : ErrorHandlerService) {
    error.handler(e)
    console.error('Erro ao buscar dados', e);
    this.showSpinner = false//não cai no complete quando dá erro
  }

  protected processarComplete() {
    this.showSpinner = false;
  }

  protected prepararEntity() {
    if(this.campeonatoSelect) {
      this.entrada.campeonato = new CampeonatoDTO(this.campeonatoSelect.value, this.campeonatoSelect.label)
    }

    if(this.metodoSelect) {
      this.entrada.metodo = new MetodoDTO(this.metodoSelect.value, this.metodoSelect.label)
    }
    if(this.mandanteSelect) {
      this.entrada.mandanteIdentificador = this.mandanteSelect.value
      this.entrada.timeMandante = this.mandanteSelect.label
    }
    if(this.visitanteSelect) {
      this.entrada.visitanteIdentificador = this.visitanteSelect.value
      this.entrada.timeVisitante = this.visitanteSelect.label
    }
    if(this.apostaAFavor === 'apostaAFavorMandante') {
      this.entrada.apostaAFavorMandante = true
      this.entrada.apostaAFavorVisitante = false
    } else if(this.apostaAFavor === 'apostaAFavorVisitante') {
      this.entrada.apostaAFavorVisitante = true
      this.entrada.apostaAFavorMandante = false
    }
    if(this.dateField) {
      this.entrada.data = DateUtils.formatDateTimezone(this.dateField)
    }
  }

  protected prepararCamposTela(response : any) {
    this.entrada = response
    this.campeonatoSelect = new Dropdown(this.entrada.campeonato!.id,  this.entrada.campeonato!.nome)
    this.metodoSelect = new MetodoDropdown(this.entrada.metodo!.id,  this.entrada.metodo!.nome)
    this.entrada.data = new Date(response.data.replaceAll('-', '/'))
    //Alteração necessária devido ao mapeamento no backend
    this.mandanteSelect = new Dropdown(this.entrada.mandanteIdentificador, this.entrada.timeMandante)
    this.visitanteSelect = new Dropdown(this.entrada.visitanteIdentificador, this.entrada.timeVisitante)

    this.metodoSelect.exigirPreenchimentoFlagMandanteVisitante = this.entrada.metodo?.exigirPreenchimentoFlagMandanteVisitante
    this.metodoSelect.exigirPreenchimentoFlagGolContraFavor = this.entrada.metodo?.exigirPreenchimentoFlagGolContraFavor
    this.metodoSelect.exigirPreenchimentoFlagRedCard = this.entrada.metodo?.exigirPreenchimentoFlagRedCard
    if(this.metodoSelect.exigirPreenchimentoFlagMandanteVisitante) {
      if(this.entrada.apostaAFavorMandante) {
        this.apostaAFavor = 'apostaAFavorMandante'
      } else if(this.entrada.apostaAFavorVisitante) {
        this.apostaAFavor = 'apostaAFavorVisitante'
      }
    }
    this.dateField = this.entrada.data
  }

  protected clearTimes() {
    this.mandanteSelect = undefined
    this.visitanteSelect = undefined
    this.filteredMandante = []
  }

  protected tratarCamposVinculados() {
    this.apostaAFavor = ''
    if(this.metodoSelect && this.metodoSelect.stakeDefault) {
      this.entrada.valor = this.metodoSelect.stakeDefault
    }
  }

  protected tratarResponse(response: any) {
    return response.collection.map((e: any) => {
      return {
        label: e.nome,
        value: e.id
      };
    });
  }

  protected tratarTimesJaSelecionados() {
    if (this.mandanteSelect) {
      const index = this.filteredVisitante.findIndex((t) => t.value === this.mandanteSelect!.value);
      if (index > -1) {
        this.filteredVisitante.splice(index, 1);
      }
    }

    if (this.visitanteSelect) {
      const index = this.filteredMandante.findIndex((t) => t.value === this.visitanteSelect!.value);
      if (index > -1) {
        this.filteredMandante.splice(index, 1);
      }
    }
  }

}
