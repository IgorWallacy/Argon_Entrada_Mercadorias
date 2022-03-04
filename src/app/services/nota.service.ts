import { Router } from '@angular/router';
import { Usuario } from './../model/Usuario';
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

  constructor(private http:HttpClient, private router:Router) { }

   api:string = environment.apiUrl

 

   getUsuarios(codigo){

    return this.http.get<Usuario>(`${this.api}/api/usuario/${codigo}`)
   }

  getUnidades() {

    

    return this.http.get<UnidadeMedida>(`${this.api}/api/unidademedida` )
  }
  
  getProdutos():Observable<Produto> {

    
    
    return this.http.get<Produto>(`${this.api}/api/produto`)
  }

 

  getNotas():Observable<Nota> {

    

    return this.http.get<Nota>(`${this.api}/api/nota`)
  }

  getNotasPorFilial(filialId):Observable<Nota> {

    

    return this.http.get<Nota>(`${this.api}/api/nota/porFilial/${filialId}`)
  }

  getNotaId(notaId, codigo):Observable<Nota> {

    

    return this.http.get<Nota>(`${this.api}/api/nota/notaId/${notaId}/usuarioCodigo/${codigo}`)
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
