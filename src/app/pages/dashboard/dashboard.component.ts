import { MessageService } from 'primeng/api';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 
  empresas;

  loading:boolean = true

  constructor(private service:DashboardService,  private route:Router, private message:MessageService) {}

  ngOnInit() {

     this.service.getFilial().subscribe( r => {

      this.empresas = r

      this.loading = false

    }, erro => {
    
      this.message.add( {severity:'error', summary:'Erro ao carregar empresas', detail:'Pressione F5 ou tente mais tarde'})
  

    }
    
    )
  }
  
 nota(idFilial, nome) {
  

   this.route.navigate([`/menu-dash/filial/${idFilial}/${nome}`])

   localStorage.setItem('idFilial', idFilial)
 }

 logout(){
  localStorage.clear();
  this.route.navigate(['/login'])
}

}