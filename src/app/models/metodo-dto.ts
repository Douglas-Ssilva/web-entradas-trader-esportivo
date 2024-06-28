import { EntityDTO } from "./entity-auto-complete-dto";

export class MetodoDTO extends EntityDTO {

  constructor(id : number, nome : string) {
    super(id);
    super.nome = nome
  }

  exigirPreenchimentoFlagMandanteVisitante? : boolean
  exigirPreenchimentoFlagGolContraFavor? : boolean
	exigirPreenchimentoFlagRedCard? : boolean

}
