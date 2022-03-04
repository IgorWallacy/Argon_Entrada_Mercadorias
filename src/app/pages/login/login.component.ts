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


  ngOnInit() {

    
  }

  usuario:Usuario = new Usuario()
  
  loading = false

  

  login(form) {
    
    this.loading = true

    this.service.tentarLogar(this.usuario.codigo, this.usuario.senha)

 

      .subscribe(response => {
     //   console.log(response)
       
        const accessToken = JSON.stringify(response)

        localStorage.setItem('access_token',accessToken)

        
        this.messageService.add({severity:'success', life: 5000, 
        summary:'Logado com Sucesso ! ', 
        detail: `Bem vindo, redirecionando para o dashboard !`});


      
        setTimeout(() => {
        this.loading = false
        this.route.navigate(['/dashboard'])
        },1500)
      }, erro => { 

        if(erro.status == 0){
          this.messageService.add({severity:'error', life: 5000, 
          summary:'Erro ao conectar com o servidor', 
          detail: `${erro.message}` });
         
        }
        else {
        this.messageService.add({severity:'error', life: 5000, 
        summary:'Usuário e/ou senha inválido(s) !', 
        detail: `Por favor tente novamente !` });
        
        }
       this.loading = false

      });
      

   

  }

  ngOnDestroy() {
  }

}
