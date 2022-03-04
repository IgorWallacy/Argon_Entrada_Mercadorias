import { Entidade } from './model/entidade';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConferenciaManualItem } from './model/conferenciaManualtem';
import { ConferenciaCegaItem } from './model/conferenciaCegaItem';
import { ConferenciaManual } from './model/conferenciaManual';

@Injectable({
  providedIn: 'root'
})
export class ConferenciaManualService {
  atualizarStatusItemRecusado(conferencia: ConferenciaManualItem) {
 //   console.log('Atualizando para reprovado' + conferencia.id + conferencia.produto.nome)
    return this.http.put(`${this.api}/api/conferenciamanual/status/atualizar/item/reprovado/${conferencia.id}`, conferencia)
    conferencia = null

  }
  atualizarStatusItemAprovado(conferencia:ConferenciaManualItem) {
 //   console.log('Atualizando para reprovado' + conferencia.id + conferencia.produto.nome)
    return this.http.put(`${this.api}/api/conferenciamanual/status/atualizar/item/aprovado/${conferencia.id}`, conferencia)
    conferencia = null
  }
  deletarItem(id: string) {
    return this.http.delete(`${this.api}/api/conferenciamanual/deletar/item/${id}`)
  }
  deletar(id: string) {
    return this.http.delete(`${this.api}/api/conferenciamanual/deletar/${id}`)
  }
  salvarItem(conferencia: ConferenciaManualItem, idConferencia) {
   
    return this.http.post<ConferenciaCegaItem>(`${this.api}/api/conferenciamanual/salvarItem/${idConferencia}`, conferencia)
  }

  buscarItensConferencia(id){

    return this.http.get<ConferenciaManual>(`${this.api}/api/conferenciamanual/conferenciaId/${id}`)
  }
  
  
  fornecedores() {
   return this.http.get<Entidade>(`${this.api}/api/entidade/fornecedores`)
  }

  constructor(private http:HttpClient) { }

  api:string = environment.apiUrl

  todos(idFilial){

    return this.http.get(`${this.api}/api/conferenciamanual/todos/${idFilial}`)

  }

  salvar(conferencia, usuario, filial) {
    return this.http.post(`${this.api}/api/conferenciamanual/salvar/${usuario}/${filial}`, conferencia)
  }

  atualizarStatusAprovado(conferenciaManual:ConferenciaManual) {
    return this.http.put(`${this.api}/api/conferenciamanual/status/atualizar/aprovado/${conferenciaManual.id}`, conferenciaManual)
  }


  atualizarStatusReprovado(conferenciaManual:ConferenciaManual) {
    return this.http.put(`${this.api}/api/conferenciamanual/status/atualizar/reprovado/${conferenciaManual.id}`, conferenciaManual)
  }

  finalizarNota(conferenciaManual:any) {
   
   
       return this.http.put(`${this.api}/api/conferenciamanual/status/atualizar/finalizado/${conferenciaManual}`, conferenciaManual)
       conferenciaManual = null
     }

}
