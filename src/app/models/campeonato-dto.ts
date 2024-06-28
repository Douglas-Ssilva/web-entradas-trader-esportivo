import { EntityDTO } from "./entity-auto-complete-dto";

export class CampeonatoDTO extends EntityDTO {

  constructor(id : number, nome : string) {
    super(id);
    super.nome = nome
  }
}
