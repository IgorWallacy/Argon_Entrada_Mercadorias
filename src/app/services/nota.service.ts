import { environment } from './../../environments/environment';
import { UnidadeMedida } from './../model/UnidadeMedida';
import { Produto } from './../model/Produto';
import { Nota } from './../model/nota';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotaConfFisica } from '../model/NotaConfFisica';
import { ConferenciaCegaItem } from '../model/conferenciaCegaItem';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

   api:string = environment.apiUrl

  getUnidades() {

    

    return this.http.get<UnidadeMedida>(`${this.api}/api/unidademedida` )
  }
  
  getProdutos() {

    
    
    return this.http.get<Produto>(`${this.api}/api/produto`)
  }

  constructor(private http:HttpClient) { }

  getNotas():Observable<Nota> {

    

    return this.http.get<Nota>(`${this.api}/api/nota`)
  }

  getNotasPorFilial(filialId):Observable<Nota> {

    

    return this.http.get<Nota>(`${this.api}/api/nota/porFilial/${filialId}`)
  }

  getNotaId(notaId):Observable<Nota> {

    

    return this.http.get<Nota>(`${this.api}/api/nota/notaId/${notaId}`)
  }

  getNotaConferenciaFisica(notaId):Observable<NotaConfFisica> {

    
    return this.http.get<NotaConfFisica>(`${this.api}/api/nota/conferencia/${notaId}`)
  }

  getNotaConferenciaItens(notaId):Observable<ConferenciaCegaItem> {

   

    return this.http.get<ConferenciaCegaItem>(`${this.api}/api/nota/conferenciaItem/ ${notaId}`)
  }

  post(notaFisica) {

    
    return this.http.post<NotaConfFisica>(`${this.api}/api/nota/fisica/` , notaFisica)
  }

  postConferencia(produto){

    
      
    return this.http.post<ConferenciaCegaItem>(`${this.api}/api/nota/conferencia/item` , produto)

  }

  deletarIten(product) {

    

    return this.http.delete(`${this.api}/api/nota/conferenciaItem/${product}` )
  }

}
