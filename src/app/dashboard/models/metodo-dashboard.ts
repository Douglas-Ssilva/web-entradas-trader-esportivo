import { Metodo } from "src/app/metodos/models/metodo";
import { TimeLucrativoDTO } from "./time-lucrativo-dto";

export class MetodoDashboard extends Metodo {
  totalEntradas? : number
  dataGrafico : any
  lucroPrejuizo? : number
  porcentagemStake? : number
  golsFavor? : number
  golsContra? : number
  redCard? : number
  correcao? : number
  totalGolsFavor? : number
  totalGolsContra? : number
  timesLucrativos ? : TimesLucrativos
  dadosGrafico ? : any
}

export class TimesLucrativos {
  timesMaisLucrativos? : TimeLucrativoDTO []
  timesMenosLucrativos? : TimeLucrativoDTO []
}
