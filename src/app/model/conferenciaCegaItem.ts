import { NotaConfFisica } from './NotaConfFisica';
import { Produto } from './Produto';
import { UnidadeMedida } from './UnidadeMedida';
export class ConferenciaCegaItem {
    id:string
    idConferencia:NotaConfFisica
    idProduto:Produto
    idUnidadeMedida:UnidadeMedida
    quantidade:number
    fatorConversao:number
    filter: any;
    validade:any
}