import { FormacaoPrecoProduto } from './../model/formacaoPrecoProduto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RemarcacaoService {

  constructor(private http:HttpClient, private router:Router) { }

  api:string = environment.apiUrl

  getRemarcoes(filial,dataInicial,dataFinal) {
    return this.http.get<FormacaoPrecoProduto>(`${this.api}/api/formacaoprecoproduto/filial/${filial}/dataInicial/${dataInicial}/dataFinal/${dataFinal}`)
  }

}
