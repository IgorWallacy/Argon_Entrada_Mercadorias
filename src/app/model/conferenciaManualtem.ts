
import { Calendar } from 'primeng/calendar';
import { ConferenciaManual } from './conferenciaManual';
import { Produto } from './Produto';
import { UnidadeMedida } from './UnidadeMedida';
export class ConferenciaManualItem{

   id:string
  
   observacao:string
  
   produto:Produto

   idConferencia: ConferenciaManual
 
   dataVencimento:Date

   idUnidadeMedida:UnidadeMedida
   
   quantidade:number
  
   fatorConversao:number
  
  
  



}