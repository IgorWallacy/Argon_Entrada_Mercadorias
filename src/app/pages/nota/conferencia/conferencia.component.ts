import { Usuario } from './../../../model/Usuario';
import { Nota } from './../../../model/nota';
import { NotaConfFisica } from './../../../model/NotaConfFisica';
import { NotaService } from './../../../services/nota.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-conferencia',
  templateUrl: './conferencia.component.html',
  styleUrls: ['./conferencia.component.css']
})
export class ConferenciaComponent implements OnInit {

  constructor(private route:Router, private rotaAtivada:ActivatedRoute, private service:NotaService  ) { }

  jwtHelper: JwtHelperService = new JwtHelperService();

   token = localStorage.getItem('access_token')
  

   notaId = this.rotaAtivada.snapshot.params['notaId'];

   codigo = this.jwtHelper.decodeToken(this.token).id

   
  

   usuario:Usuario

   notaFiscal:Nota

   loading = true

   

   notaFisica:NotaConfFisica
  

  ngOnInit(): void {
   this.buscarNotasFisica()
  }


  nova() {

/*
    this.notaFisica = {
       id: '',
       idusuario : this.codigo,
       idnotafiscal : this.notaId,
       data : ''

    }
*/
  //  console.log(this.notaFisica)
   
    this.service.post(this.notaFisica).subscribe(resposta => {
      console.log(resposta)
     this.buscarNotasFisica();
    })

  }
  
  
  editar(codigo, filial) {
   
    this.route.navigate([`conferencia/${codigo}/${filial}` ])
  }


  buscarNotasFisica(){

   

    return this.service.getNotaConferenciaFisica(this.notaId).subscribe(response => {
      
      
      this.notaFisica = response
      this.loading = false
      
    
    })
  }

}
