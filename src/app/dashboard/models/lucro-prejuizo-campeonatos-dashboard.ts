
export interface EntradaLucroPrejuizoCampeonatosDTO {
  campeonatosMaisLucrativos : EntradaCampeonatoDTO [];
	campeonatosMenosLucrativos : EntradaCampeonatoDTO [];
}

export interface EntradaCampeonatoDTO {
  nome : string;
	valor : number;
	totalEntradas : number
}
