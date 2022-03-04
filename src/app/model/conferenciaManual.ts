import { Fornecedor } from './fornecedor';
import { Filial } from './Filial';
import { Usuario } from "./Usuario"

export class ConferenciaManual {
   
    id:string
    codigo:string
    dataEmissao:Date
    dataEntrada:Date
    fornecedor:Fornecedor

    filial:Filial

    numeroNotaFiscal:string
    serieNotaFiscal:string
    valorNotaFiscal:string
    usuario:Usuario
}