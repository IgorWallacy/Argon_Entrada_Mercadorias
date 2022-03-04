import { Produto } from './Produto';

import { Filial } from "./Filial";

export class Lote {

    id:string
    codigo:number
    entrada:Date
    fabricacao:Date
    vencimento:Date
    idfilial:Filial
    idProduto:Produto

}