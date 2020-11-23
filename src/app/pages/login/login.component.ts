import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Usuario } from './../../model/Usuario';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private service:LoginService, private messageService: MessageService, private route:Router) {}

  usuarioLogado:any

  ngOnInit() {

    
  }

  usuario:Usuario = new Usuario()
  
  


  login(form) {
    

    this.service.tentarLogar(this.usuario.codigo, this.usuario.senha)
      .subscribe(response => {
     //   console.log(response)
        this.messageService.add({severity:'success', life: 5000, 
        summary:'Logado com Sucesso ! ', 
        detail: `Bem vindo redirecionando para a dashboard !`});

        const accessToken = JSON.stringify(response)

        localStorage.setItem('access_token',accessToken)

        this.route.navigate(['/dashboard'])

      }, erro => { 

        this.messageService.add({severity:'error', life: 5000, 
        summary:'Usuário e ou senha inválido(s) !', 
        detail: `Tente novamente ! Erro : ${erro.status} - ${erro.message}` });

       

      });
      

    /* 
    
    this.service.efetuarLogin(this.usuario).subscribe( r => {
      if(r === null) {
        this.messageService.add({severity:'error', life: 5000, summary:'Usuário e ou senha inválido !', detail: `Tente novamente ou reveja suas credencias com o Administrador`});
      } else {

       
        this.service.getUsuarioLogado(this.usuario.codigo).subscribe(resp => {
          this.usuarioLogado = resp
          
          //console.log(this.usuarioLogado.nome)

          localStorage.setItem('nome', this.usuarioLogado.nome)
          
        })


        
        this.messageService.add({severity:'success', life: 5000, summary:'Logado com Sucesso ! ', detail: `Bem vindo redirecionando para a dashboard !`});
        
       

    

       
        
        this.route.navigate(['/dashboard'])
      }
    }) **/

  }

  ngOnDestroy() {
  }

}
