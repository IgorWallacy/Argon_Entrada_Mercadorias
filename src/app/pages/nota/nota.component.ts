import { Router, ActivatedRoute } from '@angular/router';
import { Nota } from './../../model/nota';
import { NotaService } from './../../services/nota.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { JwtHelperService} from '@auth0/angular-jwt';



import { Table } from 'primeng/table';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {
  pt: { firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; monthNamesShort: string[]; today: string; clear: string; };

  constructor(private service:NotaService, private route:Router, private rotaAtivada:ActivatedRoute) { }

  jwtHelper: JwtHelperService = new JwtHelperService();

   token = localStorage.getItem('access_token')

   codigo = this.jwtHelper.decodeToken(this.token).id
  

  @ViewChild('dt') table: Table;

  

  

  loading: boolean = true;

  options: SelectItem[];

  value1: string = "0";

  filialId = this.rotaAtivada.snapshot.params['idFilial'];


  

  ngOnInit(): void {
    this.options = [{label: 'Não', value: '0'}, {label: 'Sim', value: '1'}];
    this.buscarNotasPorFilial()

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: [ "domingo","segunda","terça","quarta","quinta","sexta","sábado" ],
      dayNamesShort: [ "dom","seg","ter","qua","qui","sex","sáb" ],
      dayNamesMin: [ "DOM","SEG","TER","QUA","QUI","SEX","SAB" ],
      monthNames: [ "janeiro","Fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro" ],
      monthNamesShort: [ "jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez" ],
      today: 'Hoje',
      clear: 'Limpar'
  }

  

  
 
  }

  notas:Nota

  notasFilial:Nota

  buscarNotasPorFilial() {

 //   console.log(this.filialId)

    return this.service.getNotasPorFilial(this.filialId).subscribe(response => {
      this.notasFilial = response
      this.loading = false
    })
  

  }

  buscarNotas() {

    return this.service.getNotas().subscribe(response => {
      this.notas = response
      this.loading = false
    })
  }

  buscarNotaPorId(notaId) {
    return this.service.getNotaId(notaId, this.codigo).subscribe(response => {
  //   console.log(response)
    })
  }
  

  confere(notaId) {

  
    this.buscarNotaPorId(notaId)
 

  this.route.navigate([`/notas/${notaId}`])

  }

  onRepresentativeChange(event) {
    this.table.filter(event.value, 'conferencia', 'equals')
}

onDateSelect(value) {
  this.table.filter(this.formatDate(value), 'emissao', 'equals')
}

formatDate(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
      month = '0' + month;
  }

  if (day < 10) {
      day = '0' + day;
  }

  return date.getFullYear() + '-' + month + '-' + day;
}

}
