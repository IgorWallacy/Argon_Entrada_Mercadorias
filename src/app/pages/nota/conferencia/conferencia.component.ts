import { Nota } from './../../../model/nota';
import { Observable } from 'rxjs';
import { NotaConfFisica } from './../../../model/NotaConfFisica';
import { NotaService } from './../../../services/nota.service';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-conferencia',
  templateUrl: './conferencia.component.html',
  styleUrls: ['./conferencia.component.css']
})
export class ConferenciaComponent implements OnInit {

  constructor(private route:Router, private rotaAtivada:ActivatedRoute, private service:NotaService  ) { }

   notaId = this.rotaAtivada.snapshot.params['notaId'];

   

   notaFiscal:Nota

   loading = true

   notaFisica:NotaConfFisica
  

  ngOnInit(): void {
    this.buscarNotasFisica()
  }


  nova() {

    

      this.service.getNotaId(this.notaId).subscribe(response => {
       this.notaFiscal = response
      
      this.notaFisica.idnotafiscal = this.notaFiscal

     this.service.post(this.notaFisica).subscribe(response => {
    //   this.route.navigate(['/conferencia'])
          this.buscarNotasFisica();
     })

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
