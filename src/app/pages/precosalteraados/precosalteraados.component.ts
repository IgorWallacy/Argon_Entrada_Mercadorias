import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { RemarcacaoService } from './../../services/remarcacao.service';
import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { CurrencyPipe } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-precosalteraados',
  templateUrl: './precosalteraados.component.html',
  styleUrls: ['./precosalteraados.component.css']
})
export class PrecosalteraadosComponent implements OnInit {

  @ViewChild('dt') table: Table;

  pt: { firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; monthNamesShort: string[]; today: string; clear: string; };

  constructor(private service:RemarcacaoService,private datePipe: DatePipe, private currencyPipe:CurrencyPipe, private message:MessageService) { }

  loading = false

  dataInicial:Date 

  dataFinal:Date

  filial = localStorage.getItem('nomeFilial')

  produtos
  idfilial = localStorage.getItem('idFilial')

  ngOnInit(): void {

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: [ "domingo","segunda","terça","quarta","quinta","sexta","sábado" ],
      dayNamesShort: [ "dom","seg","ter","qua","qui","sex","sáb" ],
      dayNamesMin: [ "DOM","SEG","TER","QUA","QUI","SEX","SAB" ],
      monthNames: [ "janeiro","Fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro" ],
      monthNamesShort: [ "JAN","FEV","MAR","ABR","MAIO","JUN","JUL","AGO","SET","OUT","NOV","DEZ" ],
      today: 'Hoje',
      clear: 'Limpar'
  }

 //   this.buscarRemarcacoes()
  
  }

  buscarRemarcacoes(dataInicial, dataFinal) {

    this.dataInicial = dataInicial

    this.dataFinal = dataFinal

    if(this.dataInicial == null || this.dataFinal == null ) {
      this.message.add({  severity : 'warn' , sticky : true, summary : 'Atenção' , detail : 'Informe a data/hora inical e a data/hora final'})
    } else {

   this.loading = true

  

    const data1:Date = this.dataInicial

    const data2:Date = this.dataFinal

    const data1F = this.datePipe.transform(data1, 'yyyy-MM-dd HH:mm:ss');
    const data2F = this.datePipe.transform(data2, 'yyyy-MM-dd HH:mm:ss');

    
    
    return this.service.getRemarcoes(this.idfilial , data1F, data2F ).subscribe( r => {
      this.produtos = r
     this.loading = false
    
    })

  } }

  ////////////////////////////////////////////

  generatePdf( action = 'print') {



    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open();    
      break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); 
      break;
      case 'download':     
      pdfMake.createPdf(documentDefinition).download(); 
      break;
      default: pdfMake.createPdf(documentDefinition).open(); 
      break;
    }
  }
  
  getDocumentDefinition() {
  
    let digitos = '1.2-2'

    let locale = 'pt-BR'
    
    let body = []
    let body2 = []
   
    let empresa = localStorage.getItem('nomeFilial')
  
  
    let item = 0
    
    if(this.produtos == null) {
      this.message.add({severity : 'warn' , sticky : true, summary : 'Atenção', detail : 'Sem dados para impressão'})
    }
    
  
    this.produtos.forEach(element => {
  
      item++
   //   console.log(element)
     
       let data = this.datePipe.transform(element.dataHora ,'dd/MM/yy HH:mm:ss');
     //  console.log(data)
     
     
     
     
     
      
   //   console.log(this.conferencias)
     
      body = [
  
        [ [    item  ] ],
     
       [ [    element.produto.ean  ] ],
       
       [ [      element.produto.nome ] ],
      
      [['Anterior']],
      
       [ [    this.currencyPipe.transform(element.precovenda, 'BRL', '', digitos, locale) ] ],

       [['Novo']] ,

       [ [     this.currencyPipe.transform(element.precovendaajustado, 'BRL', '', digitos, locale)  ] ],

       [['Data Hora']],
  
       [ [      data   ] ]
      
      
      ]
  
      body2.push(body)
  
    //  console.log(element)
     
    });
   
  
    return {
  
      header: `
                 REMARCAÇÃO DE PREÇOS
                 ${empresa}  
               `, fontSize: 20,
  
      pageSize: 'EXECUTIVE',
        // by default we use portrait, you can change it to landscape if you wish
    pageOrientation: 'portrait',
  
    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
   
    footer: {
      columns: [
        
        { text: `Gerado em ${this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss')}`, alignment: 'center' }
      ]
    },
      content: [
  
        {
        
          layout: 'lightHorizontalLines',
          headerRows: 1,
          table: {
  
            widths: [ 'auto', 'auto', 'auto', 'auto','auto','auto','auto','auto','auto' ],
           
            body: body2
            
          }
        }
      ], 
      defaultStyle: {
        fontSize: 7,
        bold: false,
        alignment: 'center'
      },
  };
  
  }

}


