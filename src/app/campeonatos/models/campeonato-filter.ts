import { PaginationBase } from "src/app/models/pagination-base";

export class CampeonatoFiltro extends PaginationBase {
  nome : string =  '';
  campeonatoId? : number
  nomeTime : string =  '';
}
