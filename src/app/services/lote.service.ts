import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Lote } from './../model/Lote';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
 

  constructor(private http:HttpClient, private router:Router) { }


  api:string = environment.apiUrl;



  buscarVencendoHoje(filialId) {

   

    return this.http.get(`${this.api}/api/lote/contador/filial/${filialId}/venceHoje`)
  }

  buscarVencendoHojeProximos7Dias(filialId):Observable<Lote> {

   

    return this.http.get<Lote>(`${this.api}/api/lote/contador/filial/${filialId}/venceProximos15Dias`)
  }

  buscarVencendoHojeProximos15Dias(filialId):Observable<Lote> {

   

    return this.http.get<Lote>(`${this.api}/api/lote/contador/filial/${filialId}/venceProximos7Dias`)
  }

  buscarVencendoHojeProximos30Dias(filialId):Observable<Lote> {

   

    return this.http.get<Lote>(`${this.api}/api/lote/contador/filial/${filialId}/venceProximos30Dias`)
  }

  buscarTodos(filialId):Observable<Lote> {

    return this.http.get<Lote>(`${this.api}/api/lote/todos/filial/${filialId}`)
  }

  porData(filialId, dataInicial, dataFinal):Observable<Lote> {

    return this.http.get<Lote>(`${this.api}/api/lote/filial/${filialId}/dataInicial/${dataInicial}/dataFinal/${dataFinal}`)
  }

  salvar(lote, filialId) {
    return this.http.post(`${this.api}/api/lote/salvar/filial/${filialId}`, lote)
  }

  deletar(id) {
    return this.http.delete(`${this.api}/api/lote/deletar/${id}`)
  }

  vencimentoNotaItem(filialId) {

    return this.http.get(`${this.api}/api/conferenciamanual/vencimento/${filialId}`)
  }

  vencimentoNotaItemPorDataSaldoPositivo(filialId, dataInicial, dataFinal) {

    return this.http.get(`${this.api}/api/conferenciamanual/vencimento/filial/${filialId}/dataInicial/${dataInicial}/dataFinal/${dataFinal}/SaldoPositivo`)
  }

  vencimentoNotaItemPorData(filialId: any, dataInicial: string, dataFinal: string) {
    return this.http.get(`${this.api}/api/conferenciamanual/vencimento/filial/${filialId}/dataInicial/${dataInicial}/dataFinal/${dataFinal}`)
  }

}
