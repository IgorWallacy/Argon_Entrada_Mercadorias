import { NotaService } from './../../services/nota.service';
import { ProdutoVencimentoExcel } from './../../model/produtoVencimentoExcel';
import {get} from 'lodash';


import { LoteService } from './../../services/lote.service';
import { Component, OnInit } from '@angular/core';
import { Lote } from 'src/app/model/Lote';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;





@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.css']
})
export class LoteComponent implements OnInit {
  vencimento: String;
  entrada:string
  produtoExcel = <ProdutoVencimentoExcel[]>[]  
  pt: { firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; monthNamesShort: string[]; today: string; clear: string; };
  submitted: boolean;
  
  constructor(private router:Router, private messageService: MessageService, private confirmationService: ConfirmationService,
    private service:LoteService, private datePipe: DatePipe, private decimalPipe: DecimalPipe,   private rotaAtivada:ActivatedRoute, private notaService:NotaService,
    private message:MessageService
    ) { }

  _ = get;

  checked: boolean = true;


  filialId = this.rotaAtivada.snapshot.params['idFilial'];

  dataInicial: any
  dataFinal: any

  lote:Date = new Date()

  produtos: any

  produtos2: any

  loteNovo: Lote 

  produtosSelecionados: Lote;

  cols:any[]

  produtoex =  <ProdutoVencimentoExcel[]>[]  ;


  loading:boolean = false


  produtoDialog: boolean;

  exportColumns: any[];

  product: Lote

  produtoResult: any[];

  filial = localStorage.getItem('nomeFilial')

  openNew(){
    this.product =  new Lote
    this.submitted = false;
    this.produtoDialog = true;
  }

  hideDialog() {
    this.produtoDialog = false;
    this.submitted = false;
}

  search(event){

    
    
    this.produtoResult = this.produtos2.filter(c => c.nome.toUpperCase().startsWith(event.query.toUpperCase()) || (c.ean.startsWith(event.query)));
    
  }

  carregarProdutos(){

    this.notaService.getProdutos().subscribe(response => {
      this.produtos2 = response
     
    })
  }

  ngOnInit(): void {

  //  this.buscarItensNota()

    //this.carregarProdutos();
   
    
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

  /*
    this.service.buscarTodos(this.filialId).subscribe(r => {
          this.produtos = r
          this.loading = false
         

         
    })
   
     /*

   

 /*   this.cols = [
      { field: 'codigo', header: 'Código'  },
      { field: 'idProduto.nome', header:'Produto'},
      { field: 'vencimento',  header: 'Data de validade' },
     
  ];
*/
 // this.exportColumns = this.cols.map(col => ({ head: col.header, body: col.field.subfield}));


 

    
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.produtos.length; i++) {
        if (this.produtos[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

  buscarItensNota() {
    this.service.vencimentoNotaItem(this.filialId).subscribe( r => {
     this.produtos = r
  //   console.log(this.produtos)
     this.loading = false
    })
  }

  buscarTodos(){
    this.service.buscarTodos(this.filialId).subscribe(r => {
  //    this.produtos = r
      this.loading = false
     

     
})
  }

  porData(dataInicial, dataFinal) {

   this.dataInicial = dataInicial
   this.dataFinal = dataFinal

  //  console.log(data1)

  if((dataInicial) &&  (dataFinal)) {

    const data1 =this.formatDate(dataInicial)

    const data2 = this.formatDate(dataFinal)

    this.service.porData(this.filialId,data1, data2).subscribe(r => {
      this.loading = true
      this.produtos = r
      this.loading = false
    

     
})
  } else {
    this.message.add({severity : 'warn' , detail : 'Selecione a data inicial e a data final' , sticky : true, summary : 'Atenção' })
    this.loading = false
  }

  

  
}

porDataItensNota(dataInicial, dataFinal) {

  this.loading = true
  this.dataInicial = dataInicial
  this.dataFinal = dataFinal

 //  console.log(data1)

 if((dataInicial) &&  (dataFinal)) {

   const data1 =this.formatDate(dataInicial)

   const data2 = this.formatDate(dataFinal)

   

    if(this.checked) { 
    
    

    this.service.vencimentoNotaItemPorDataSaldoPositivo(this.filialId,data1, data2).subscribe(r => {
    
      this.produtos = r
      this.loading = false
     // console.log(this.produtos)
   
 
     
 }) 
    
  } else 
  {
    this.service.vencimentoNotaItemPorData(this.filialId,data1, data2).subscribe(r => {
    
     this.produtos = r
     this.loading = false
    // console.log(this.produtos)
  

    
}) 
 }} else {
  // this.buscarItensNota()
  this.message.add({severity : 'warn' , detail : 'Selecione a data inicial e a data final' , sticky : true, summary : 'Atenção' })
  this.loading = false
 } 

 

 
}

  exportExcel() {

   this.produtoExcel  = []
    

    import("xlsx").then(xlsx => {
       
       
      for (let i in this.produtos) {
    
          
      this.vencimento = this.datePipe.transform(this.produtos[i].dataVencimento ,'dd/MM/yyyy');

      this.entrada = this.datePipe.transform(this.produtos[i].conferenciaManual.dataEntrada ,'dd/MM/yyyy');
     
      let quantidadeVendida  = this.produtos[i].quantidadeSaida ? this.produtos[i].quantidadeSaida : 0

      let quantidadeEntradaTotal  = this.produtos[i].quantidade * this.produtos[i].fatorConversao

      let quantidadeEntrada =  this.produtos[i].quantidade

      let saldo  = quantidadeEntradaTotal - this.produtos[i].quantidadeSaida 



      this.produtoex =   [{  'Fornecedor': this.produtos[i].conferenciaManual.fornecedor.nome, 

                              'Nota': this.produtos[i].conferenciaManual.numeroNotaFiscal,
                              'Produto' : this.produtos[i].produto.nome ,  'Entrada' : this.entrada, 'Vencimento' : this.vencimento,
                              'Quantidade_Entrada': quantidadeEntrada ,
                              'Embalagem' : this.produtos[i].idUnidadeMedida.codigo + '(' + this.produtos[i].fatorConversao + ')',
                              'Quantidade_Entrada_Total' : quantidadeEntradaTotal,
                              'Quantidade_Vendida' : quantidadeVendida , 
                              'Saldo' : saldo ,
                             
                            }  ] 
    
    //  console.log(this.produtoex[0] )

      this.produtoExcel .push( this.produtoex[0] )

      }

     

   //   this.produtoExcel.push(this.produtoex[i])
     
   
    //     console.log(this.produtoex)
        const worksheet = xlsx.utils.json_to_sheet(this.produtoExcel)
      
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: [`data`] };
      
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "produtos");
      //  console.log(this.produtos)
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
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

voltar() {
   let idFilial = localStorage.getItem('idFilial')
   let nomeFilial = localStorage.getItem('nomeFilial')

   this.router.navigate([`menu-dash/filial/${idFilial}/${nomeFilial}`])
}

saveProduct() {
  this.submitted = true;

     
    
    
     
     this.service.salvar(this.product, this.filialId).subscribe( r=> {
      this.messageService.add({severity:'success', summary:'Validade cadastrada com Sucesso !', detail: `O produto ${this.product.idProduto.nome} salvo !`});

      this.buscarTodos();

      this.produtoDialog = false;

      this.product = new Lote;
     })
       
          
      /*

      this.produtos = [...this.produtos];
      this.produtoDialog = false;
      this.product = {};
  */
}



deleteProduct(product: Lote) {
  this.confirmationService.confirm({
      message: 'Tem certeza que desja deletar ' + product.idProduto.nome + '?',
      header: 'Confirmação ',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel : 'Não',
      acceptButtonStyleClass : 'p-button-success',
      rejectButtonStyleClass : 'p-button-danger',
      accept: () => {
        
         

          this.produtos = this.produtos.filter(val => val.id !== product.id);
          this.service.deletar(product.id).subscribe(r => {

            this.product = new Lote
            this.buscarTodos()
            this.messageService.add({severity:'success', summary: 'Sucesso !', detail: 'Produto Deletado', life: 3000});

          }, erro => {
            this.messageService.add({severity:'error', summary: 'Erro !', detail: 'Erro ao deletar produto', life: 3000});
            this.buscarTodos()
          }
          )
         
      }
  });
}

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

  //console.log(this.produtos)

  
  
  let body = []
  let body2 = []
 
  let empresa = localStorage.getItem('nomeFilial')

  

  let item = 0
  
  if(this.produtos == null) {
    this.message.add({severity : 'warn' , sticky : true, summary : 'Atenção', detail : 'Sem dados para impressão'})
  }

  
  

  this.produtos.forEach(element => {

    item++
  //  console.log(element)
   
     let dataVencimento = this.datePipe.transform(element.dataVencimento ,'dd/MM/yy');

     let dataEntrada = this.datePipe.transform(element.conferenciaManual.dataEntrada ,'dd/MM/yy');
   //  console.log(data)
   
   let fornecedor = element.conferenciaManual.fornecedor.nome
   
   let quantidade = element.quantidade

   let fator = element.fatorConversao

   let embalagem = element.idUnidadeMedida.codigo

   let quantidadeSaida = element.quantidadeSaida ? element.quantidadeSaida : 0

  

   
    let quantidadeSaidaFormatada = this.decimalPipe.transform(quantidadeSaida, '1.2-3' , 'pt-BR')

    let saldoFormatado = this.decimalPipe.transform(quantidade * fator - quantidadeSaida, '1.2-3', 'pt-BR')
   
    let compraFormatada = this.decimalPipe.transform( quantidade * fator , '1.2-3', 'pt-BR')

   
  
    
 //   console.log(this.conferencias)
   
    body = [

      [ [    item  ] ],
   
     [ [  element.produto.ean  ] ],
     
     [ [  element.produto.nome ] ],
    
   
    
   //  [ [    fornecedor ] ],

     [['Compra ('+ quantidade + ' ' + embalagem+ '(s)' + ' ('+fator+')) = ' + compraFormatada ]] ,

    
    
     [['Venda('+ quantidadeSaidaFormatada + ')']],

    
     [['Saldo('+ saldoFormatado + ')']],
    

     [ [  'Ent ' +  dataEntrada  ] ],

     

    

     [ [   'Venc ' +   dataVencimento   ] ]
    
    
    ]

    body2.push(body)

  //  console.log(element)
   
  });
 

  return {

    header: `
               CONFERÊNCIA DE VALIDADES
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

          widths: [  'auto', 'auto', 'auto','auto','auto','auto','auto','auto' ],
         
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
