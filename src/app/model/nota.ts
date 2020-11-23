import { Filial } from "./Filial"

export class Nota {

    id:string
    razaosocial:string
    numeroNotaFiscal:string
    cnpjcpf:string
    emissao:Date
    valorTotalNota:string
    filial:Filial
}