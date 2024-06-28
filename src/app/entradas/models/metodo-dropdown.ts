import { Dropdown } from "src/app/models/dropdown";


export class MetodoDropdown extends Dropdown {

  constructor(value : number, label : string) {
    super(value, label);
    this.value = value
    this.label = label
  }

  stakeDefault? : number;
  exigirPreenchimentoFlagMandanteVisitante? : boolean
  exigirPreenchimentoFlagGolContraFavor? : boolean
	exigirPreenchimentoFlagRedCard? : boolean
}
