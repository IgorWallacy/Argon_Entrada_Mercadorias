import { LoteService } from './../../services/lote.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-dash',
  templateUrl: './menu-dash.component.html',
  styleUrls: ['./menu-dash.component.css']
})
export class MenuDashComponent implements OnInit {
  produtoVencendoProximos15dias: import("c:/Users/Igor/Documents/Desenvolvimento/argon-dashboard-angular-master/src/app/model/Lote").Lote;
  produtoVencendoProximos30dias: import("c:/Users/Igor/Documents/Desenvolvimento/argon-dashboard-angular-master/src/app/model/Lote").Lote;

  

  constructor( private route:Router,  private rotaAtivada:ActivatedRoute, private loteService:LoteService) { }

  filialId = this.rotaAtivada.snapshot.params['idFilial'];

  nomeFilial = this.rotaAtivada.snapshot.params['filialNome'];

  produtoVenceHoje:any 

  produtoVencendoProximos7dias:any

  menu = []

  ngOnInit(): void {
    this.menu = ['']
    this.buscarProdutosVenceHojeContador()
    this.buscarProdutosVencendoProcimos7Dias()
    this.buscarProdutosVencendoProcimos15Dias()
    this.buscarProdutosVencendoProcimos30Dias()
  }


  buscarProdutosVenceHojeContador() {

    this.loteService.buscarVencendoHoje(this.filialId).subscribe(r => {
      this.produtoVenceHoje = r
    })
  }

  buscarProdutosVencendoProcimos7Dias(){
    this.loteService.buscarVencendoHojeProximos7Dias(this.filialId).subscribe(r => {
      this.produtoVencendoProximos7dias = r
    })
  }

  buscarProdutosVencendoProcimos15Dias(){
    this.loteService.buscarVencendoHojeProximos15Dias(this.filialId).subscribe(r => {
      this.produtoVencendoProximos15dias = r
    })
  }

  buscarProdutosVencendoProcimos30Dias(){
    this.loteService.buscarVencendoHojeProximos30Dias(this.filialId).subscribe(r => {
      this.produtoVencendoProximos30dias = r
    })
  }
  
  nota() {
   
    this.route.navigate([`/notas/filial/${this.filialId}`])
  }

  notaManual() {
   
    this.route.navigate([`/notas/manual/filial/${this.filialId}/${this.nomeFilial}`])
    localStorage.setItem('nomeFilial', this.nomeFilial)
    localStorage.setItem('idFilial', this.filialId)
  }

  remarcacaoPreco() {
   
    this.route.navigate([`/remarcacao/`])
    localStorage.setItem('nomeFilial', this.nomeFilial)
    localStorage.setItem('idFilial', this.filialId)
  }

  validade() {
    localStorage.setItem('nomeFilial', this.nomeFilial)
    localStorage.setItem('idFilial', this.filialId)
    this.route.navigate([`/lotes/filial/${this.filialId}`])
  }
}
