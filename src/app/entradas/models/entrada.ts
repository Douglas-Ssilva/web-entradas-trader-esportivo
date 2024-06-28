
import { CampeonatoDTO } from "src/app/models/campeonato-dto";
import { MetodoDTO } from "src/app/models/metodo-dto";


export class Entrada {
  id? : number;
  valor? : number;
  lucroPrejuizo? : number;
  odd? : number;//retornar odd
  redCard?: boolean;
  golAFavor: boolean = false;
  golContra: boolean = false;
  maisGolsFavor: boolean = false;
  maisGolsContra: boolean = false;
  apostaAFavorMandante = false
  apostaAFavorVisitante = false
  exigirPreenchimentoFlagMandanteVisitante = false
  data?: Date;

  campeonato? : CampeonatoDTO
  mandanteIdentificador! : number
  timeMandante! : string
  timeVisitante! : string
  visitanteIdentificador! : number
  metodo? : MetodoDTO
}
