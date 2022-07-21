import { MessageService, ConfirmationService, Header } from 'primeng/api';
import { ConferenciaManualService } from './../../../../conferencia-manual.service';
import { NotaService } from './../../../../services/nota.service';
import { ConferenciaManualItem } from './../../../../model/conferenciaManualtem';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { DatePipe } from '@angular/common';
import { ConferenciaManual } from 'src/app/model/conferenciaManual';
import { LoginService } from 'src/app/services/login.service';
import { Table } from 'primeng/table';
import { interval, Subscription } from 'rxjs';

import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
 


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ManualItemComponent implements OnInit {
  unidades: any = [];

  
  unidadeResult: any;
  pt: { firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; monthNamesShort: string[]; today: string; clear: string; };
  value = 0;

  constructor(private produtoService:NotaService,private service:ConferenciaManualService, private messageService:MessageService, private datePipe: DatePipe,
     private rotaAtivada:ActivatedRoute, private confirmationService:ConfirmationService, private loginService:LoginService, private route:Router) { }

  conferenciaId = this.rotaAtivada.snapshot.params['idConferencia'];

  fornecedor = this.rotaAtivada.snapshot.params['fornecedor'];



  @ViewChild('dt') table: Table;
 
  conferencia: {};



  conferenciaManual: ConferenciaManual


  loading = true

  produtos:any

  produtoLocalStorage = localStorage.getItem('produtos')

  results: any[]; 
  conferencias:any

  conferenciasPDF:ConferenciaManualItem[] = []

  exportColumns: any[];

  conferenciaDialog: boolean;

  submitted: boolean;

  supervisor:any

  paginaCarregada = true

  subscription: Subscription;

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;
 
  barcodeValue;

  abrirCameraDialog: boolean

  produtoLido:string 

  lido: string = '';

  product: {};

  getColor(status) { (2)
    switch (status) {
      case 'ACEITO':
        return 'green';
      case null:
        return '#FFBF00';
      case 'RECUSADO':
        return 'red';
    }
  }

  ngAfterViewInit() {
    this.barcodeScanner.start();
    
  }

  abrirCamera(){

   
    
    this.messageService.clear();

    this.abrirCameraDialog = true

    

    this.barcodeScanner.start();

    
    
    
  }

  fecharCamera() {
   
    

    

    this.barcodeScanner.stop();

    this.barcodeScanner == null

   
  }


  ngOnInit(): void {

const source = interval(10000);
this.subscription = source.subscribe(val => this.buscarConferenciaId());

    this.getColor(status)

    this.supervisor = this.loginService.getSupervisorUsuarioAutenticado()

   
    this.loadingPagina()
 

   
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


  //  this.buscarProdutos()
    this.buscarConferenciaId()
    this.carregarUnidades()
    this.verificarLocalStorage()

   
  }

  loadingPagina() {
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if(this.value >= 99) { this.value = 75}
      if (this.paginaCarregada == false) {
          this.value = 100;
        //  this.messageService.add({severity: 'info', summary: 'Success', detail: 'Process Completed'});
          clearInterval(interval);
      }
  }, 2000);
  }


  verificarLocalStorage(){
    
    if( this.produtoLocalStorage === null) {
    //  console.log('esta nulo')
    return  this.buscarProdutos();
      

    } else {
      this.paginaCarregada = false
      this.produtos = JSON.parse(localStorage.getItem('produtos'))
  //    console.log(this.produtos)
    }
  }

  syncronizarProdutosServidor(){
    localStorage.removeItem('produtos')
    this.paginaCarregada = true
    return this.buscarProdutos()
  }

  buscarProdutos(){
    return this.produtoService.getProdutos().subscribe(r => {
      this.produtos = r
      this.paginaCarregada = false
      localStorage.setItem('produtos', JSON.stringify(r))
      
    })
  }

          aprovarConferencia(){

           this.conferencias[this.findIndexById(this.conferenciaId)] = this.conferenciaManual;                

          this.service.atualizarStatusAprovado(this.conferenciaId).subscribe(r=> {

          this.messageService.add({severity:'success', summary: 'Sucesso !', detail: 'Confêrencia alterada para Aprovada', life: 3000});

          this.conferencias = [...this.conferencias];
          this.conferenciaDialog = false;
          this.conferencia = new ConferenciaManualItem;
          this.buscarConferenciaId()
         
          }, erro => {
            this.messageService.add({severity:'error', summary: 'Erro !', detail: 'Erro ao atualizar status da conferência!', life: 3000});
          }
          )
    
  }

  reprovarConferencia(){

    this.conferencias[this.findIndexById(this.conferenciaId)] = this.conferenciaManual;                

   this.service.atualizarStatusReprovado(this.conferenciaId).subscribe(r=> {

   this.messageService.add({severity:'info', summary: 'Sucesso !', detail: 'Confêrencia alterada para Reprovada', life: 3000});

   this.conferencias = [...this.conferencias];
   this.conferenciaDialog = false;
   this.conferencia = new ConferenciaManualItem;
   this.buscarConferenciaId()
  
   }, erro => {
     this.messageService.add({severity:'error', summary: 'Erro !', detail: 'Erro ao atualizar status da conferência!', life: 3000});
   }
   )

}

scan(leitor) {

   
  //console.log(leitor)

  this.lido = leitor.codeResult.code

  

   

  this.results = this.produtos.filter(c =>  c.ean.startsWith(`${this.lido}`));

  const contador = Object.entries(this.results).length;

   this.messageService.add({severity:'info', life: 5000, summary: 'Leu o código : ', detail: `${this.lido}`})
    

  

  if(contador === 0){
    this.messageService.add({severity:'warn', life: 5000 , summary: `Produto não encontrado para o codigo: ${this.lido} `, detail: `Digite o nome ou o código ou tente novamente a leitura`});
    this.fecharCamera();
   
    
  } 

  if(contador >= 1){
    
    const nome = this.results.find( nome => nome)

    this.messageService.add({severity:'success', life: 5000, summary: ' Produto encontrado : ', detail: `${nome.nome}`})
    

  } 
  
  this.conferencia = {
  produto:  this.results.find( id => id)
   

  
  
};

 
  
   
  this.abrirCameraDialog = false
  this.fecharCamera();
  
 

 
  
}



  search(event){
    
    this.results = this.produtos.filter(c => c.nome.toUpperCase().startsWith(event.query.toUpperCase()) || (c.ean.startsWith(event.query) || (c.codigo.startsWith(event.query) )));
   // console.log(this.conferencia)
  
   
    
    
  }

  openNew() {
    this.conferencia = new ConferenciaManualItem
    this.submitted = false;
    this.conferenciaDialog = true;
}

hideDialog() {
  this.conferenciaDialog = false;
  this.submitted = false;
}

saveProduct(conferencia:ConferenciaManualItem) {
       this.submitted = true;
      this.loadingPagina()

      if (conferencia.id) {
          this.conferencias[this.conferencia = this.findIndexById(conferencia.id)] = this.conferencia;                
          this.paginaCarregada = true

          let now = new Date

          if(conferencia.dataVencimento <= now) {
            this.messageService.add({severity : 'warn', detail : `Produto ${conferencia.produto.nome} vencido !`, summary : 'Atenção ! Produto vencido! Verifique', sticky : true})
          }

          this.service.salvarItem(conferencia, this.conferenciaId).subscribe(r=> {

          this.messageService.add({severity:'success', summary: 'Sucesso !', detail: `Produto ${conferencia.produto.nome} atualizado`, life: 3000});

          this.conferencias = [...this.conferencias];
          this.conferenciaDialog = false;
          this.conferencia = {}
          this.buscarConferenciaId()
          this.paginaCarregada = false
          }, erro => {
            this.conferenciaDialog = false;
            this.paginaCarregada = false
           
            this.messageService.add({severity:'error', summary: 'Erro !', detail: `Erro ao  atualizar produto ${conferencia.produto.nome}`, life: 3000});
          }
          )}
      
      else {
      //    this.conferencia.id = this.createId();
      if( (conferencia.quantidade != null) && (conferencia.idUnidadeMedida != null) && (conferencia.produto != null) && (conferencia.fatorConversao != null) && (conferencia.dataVencimento != null) ) {
       
         let now = new Date
           this.paginaCarregada = true

          if(conferencia.dataVencimento <= now) {
            this.messageService.add({severity : 'warn', summary : `Produto ${conferencia.produto.nome} vencido !`, detail : 'Atenção ! Produto vencido! Verifique', sticky : true})
          }

          
            

           

          this.service.salvarItem(conferencia, this.conferenciaId).subscribe(r=> {

            //  console.log(r)

          //  this.conferencias.push(this.conferencia);
           
            this.messageService.add({severity:'success', summary: 'Sucesso !', detail: `Produto ${conferencia.produto.nome} cadastrado`, life: 3000});

            this.conferencias = [...this.conferencias];
            this.conferenciaDialog = false;
            this.conferencia = {}
            this.buscarConferenciaId()
            this.paginaCarregada = false

          }, erro => {
            this.paginaCarregada = false
            this.conferenciaDialog = false;
            this.messageService.add({severity:'error', summary: 'Erro !', detail: `Erro ao cadastrar produto ${conferencia.produto.nome}`, life: 3000});
          }
          )

        
      }}

    
  }
  buscarConferenciaId() {

  return this.service.buscarItensConferencia(this.conferenciaId).subscribe( r => {
      this.conferencias = r

      this.loading = false
      
     
    //  console.log(r)
     
    })
    
  }

  

  
  searchUnidade(event){
    
    this.unidadeResult = this.unidades.filter(c => c.nome.toUpperCase().startsWith(event.query.toUpperCase()) || (c.codigo.startsWith(event.query)));
    
  }

  
  carregarUnidades(){

    this.produtoService.getUnidades().subscribe(response => {
      this.unidades = response
    
    })
  }

  voltar() {
    let idFilial = localStorage.getItem('idFilial')
    let nomeFilial = localStorage.getItem('nomeFilial')
    this.route.navigate([`notas/manual/filial/${idFilial}/${nomeFilial}`])
  }

  finalizar(){
    
     
  

  let conferenciaManual = this.conferenciaId

   

   
   
    this.service.finalizarNota(conferenciaManual).subscribe(r=> {
      
    this.messageService.add({severity:'success', summary: 'Sucesso !', detail: `Confêrencia da nota ${conferenciaManual} alterada para finalizada`, life: 3000});
   
    this.voltar()
   
    }, erro => {
      this.messageService.add({severity:'error', summary: 'Erro !', detail: `Erro ao atualizar status da conferência da nota ${conferenciaManual} para finalizado!`, life: 3000});
    }
    )
   
   }


findIndexById(id: string): number {
  let index = -1;
  
  for (let i = 0; i < this.conferencias.length; i++) {
      if (this.conferencias[i].id === id) {
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

editProduct(conferencia:ConferenciaManualItem) {
  
 // console.log(conferencia)

  conferencia.dataVencimento = new Date(conferencia.dataVencimento)

  this.conferencia = {...conferencia};

 
 // console.log(this.conferencia)

  this.conferenciaDialog = true;

  
  
}

deleteProduct(conferencia: ConferenciaManualItem) {
  this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + conferencia.produto.nome + '?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel : 'Não',
      acceptLabel : 'Sim',
      acceptButtonStyleClass : 'p-button-success',
      rejectButtonStyleClass : 'p-button-danger',
      accept: () => {
         

          this.service.deletarItem(conferencia.id).subscribe( r => {
            this.conferencias = this.conferencias.filter(val => val.id !== conferencia.id);
         // this.conferencia = {}
          this.messageService.add({severity:'success', summary: 'Sucesso!', detail: `Produto ${conferencia.produto.nome} deletado!`, life: 3000});

          this.buscarConferenciaId();

          }, erro => {

            this.messageService.add({severity:'error', summary: 'Erro!', detail: `Erro ao deletar produto ${conferencia.produto.nome} !`, life: 3000});

            this.buscarConferenciaId();
  

          }
          )

          
      }
  });
}

aceitar(conferenciaA:ConferenciaManualItem) {
 
  this.service.atualizarStatusItemAprovado(conferenciaA).subscribe(r => {
    this.messageService.add({severity:'success', summary: 'Sucesso!', detail: ` Produto ${conferenciaA.produto.nome} atualizado para aceito !`, life: 3000});
   conferenciaA = new ConferenciaManualItem
    this.buscarConferenciaId()
  }, erro => {
    this.messageService.add({severity:'error', summary: 'Erro!', detail: ` Erro ao atualizar status para aceito`, life: 3000});
    this.buscarConferenciaId()
    conferenciaA = new ConferenciaManualItem
  }
  )
} 

recusar(conferenciaR:ConferenciaManualItem) {
  this.service.atualizarStatusItemRecusado(conferenciaR).subscribe(r => {
    this.messageService.add({severity:'warn', summary: 'Sucesso!', detail: `${conferenciaR.produto.nome} atualizado para recusado !`, life: 3000});
    conferenciaR = new ConferenciaManualItem
    this.buscarConferenciaId()
  }, erro => {
    this.messageService.add({severity:'error', summary: 'Erro!', detail: `Erro ao atualizar status para recusado!`, life: 3000});
    conferenciaR = new ConferenciaManualItem
    this.buscarConferenciaId()
  }
  )
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

  
  let body = []
  let body2 = []
  let conferente = []
  let empresa = []
  let fornecedor = []
  let fornecedorCNPJ =[]
  let numeroNota = []
  let serie = []

  let item = 0
  
  

  this.conferencias.forEach(element => {

    item++
   
     let data = this.datePipe.transform(element.dataVencimento ,'dd/MM/yy');
   //  console.log(data)
    conferente = element.conferenciaManual.usuario.nome
    empresa = element.conferenciaManual.idfilial.nome
    fornecedorCNPJ = element.conferenciaManual.fornecedor.cnpjcpf
    numeroNota = element.conferenciaManual.numeroNotaFiscal
    serie = element.conferenciaManual.serieNotaFiscal
    fornecedor = element.conferenciaManual.fornecedor.nome
 //   console.log(this.conferencias)
   
    body = [

      [ [    item  ] ],
   
     [ [    element.produto.ean  ] ],
     
     [ [        element.produtoSemCadastro? element.produtoSemCadastro : element.produto.nome ] ],
    
     [ [      element.idUnidadeMedida.nome ] ],
    
     [ [    'Qtde', + element.quantidade  ] ],
     [ [    'Emb', + element.fatorConversao  ] ],

     [ [      data   ] ],
     [ [    'Total ', + element.fatorConversao * element.quantidade ] ],
     [ [     element.status ? element.status: 'PENDENTE' ] ],
    ]

    body2.push(body)

  //  console.log(element)
   
  });
 

  return {

    header: `EMPRESA ${empresa}  
             FORNECEDOR ${fornecedor} - N° NOTA ${numeroNota} - SÉRIE ${serie}
             CNPJ/CPF ${fornecedorCNPJ}
           
             
             `, fontSize: 10,

    pageSize: 'EXECUTIVE',
      // by default we use portrait, you can change it to landscape if you wish
  pageOrientation: 'portrait',

  // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
 
  footer: {
    columns: [
      
      { text: `CONFERIDO POR ${conferente}`, alignment: 'center' }
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
