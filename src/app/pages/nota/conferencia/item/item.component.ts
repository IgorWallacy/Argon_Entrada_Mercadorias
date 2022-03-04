
import { Produto } from './../../../../model/Produto';
import { NotaService } from './../../../../services/nota.service';
import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenciaCegaItem } from 'src/app/model/conferenciaCegaItem';
import { ConfirmationService, MessageService } from 'primeng/api';

import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";




@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
  
})
export class ItemComponent implements OnInit {
  
  produtos:any = []
  unidades:any = []

  loading:boolean = true
  
  filteredBrands: any[];
  brands: any;
  produtoResult: any[];
  unidadeResult: any;

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;
 
  barcodeValue;

  produto:Produto
  pt: { firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; monthNamesShort: string[]; today: string; clear: string; };
  
  editando: boolean = false;
  lido: string = '';
  paginaCarregada = true;
  

  constructor(private service:NotaService, private rotaAtivada:ActivatedRoute, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  productDialog: boolean;
  abrirCameraDialog: boolean

  produtoLido:string 

  product: {};

  selectedProducts: ConferenciaCegaItem[];

  submitted: boolean;

  products: ConferenciaCegaItem[];

  
  

  codigo = this.rotaAtivada.snapshot.params['codigo'];

  idFilial = this.rotaAtivada.snapshot.params['filialId'];

  itens

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

  

  carregarUnidades(){

    this.service.getUnidades().subscribe(response => {
      this.unidades = response
    })
  }

  carregarProdutos(){

    this.service.getProdutos().subscribe(response => {
      this.produtos = response 
      this.paginaCarregada = false
      localStorage.setItem('produtos', JSON.stringify(response))
    })
  }

  
   
 

  scan(leitor) {

   
    //console.log(leitor)

    this.lido = leitor.codeResult.code

     
 
     

    this.produtoResult = this.produtos.filter(c =>  c.ean.startsWith(`${this.lido}`));

    const contador = Object.entries(this.produtoResult).length;

     this.messageService.add({severity:'info', life: 5000, summary: 'Leu o código : ', detail: `${this.lido}`})
      
  
    

    if(contador === 0){
      this.messageService.add({severity:'warn', life: 5000 , summary: `Produto não encontrado para o codigo: ${this.lido} `, detail: `Digite o nome ou o código ou tente novamente a leitura`});
      this.fecharCamera();
     
      
    } 

    if(contador >= 1){
      
      const nome = this.produtoResult.find( nome => nome)

      this.messageService.add({severity:'success', life: 5000, summary: ' Produto encontrado : ', detail: `${nome.nome}`})
      

    } 
    
    this.product = {
    idProduto:  this.produtoResult.find( id => id)
     

    
    
  };

   
    
     
    this.abrirCameraDialog = false
    this.fecharCamera();
    
   

   
    
  }

  search(event){
    
    this.produtoResult = this.produtos.filter(c => c.nome.toUpperCase().startsWith(event.query.toUpperCase()) || (c.ean.startsWith(event.query)));
    
  }

  searchUnidade(event){
    
    this.unidadeResult = this.unidades.filter(c => c.nome.toUpperCase().startsWith(event.query.toUpperCase()) || (c.codigo.startsWith(event.query)));
    
  }
  

  salvar(product:ConferenciaCegaItem){
    
       
       
        this.submitted = true;

        if((product.idProduto != null)  && (product.quantidade != null) && (product.idUnidadeMedida != null) && (product.fatorConversao != null)) {

          

          this.service.postConferencia(product).subscribe(resposta => {

          this.messageService.add({severity:'success', summary:'Produto conferido com Sucesso !', detail: `O produto ${product?.idProduto.nome} salvo !`});

          this.buscarNotaItens();

          this.productDialog = false;

          this.product = {};

        },  error => {
          this.messageService.add({severity:'error', summary : 'Erro ao gravar a conferência ...' , detail : `${error.error}` });
        }
        ) }

   //    console.log(product)
        
    
      
      

      
  }




  openNew() {

    

    this.editando = false

    

    

  // console.log("filial" + this.product)
   
    
    this.product = { idConferencia : {
      id : this.codigo,
      filial: {
        id : this.idFilial
      }
    }};
    
    
    this.submitted = false;
    this.productDialog = true;
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Deseja deletar o(s) produto(s) selecionado(s)?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel : 'Não',
      accept: () => {
          
         

          this.service.deletarIten(this.itens).subscribe( response => {
            this.itens = this.itens.filter(val => !this.selectedProducts.includes(val));
            this.selectedProducts = null;
            this.messageService.add({severity:'success', summary: 'Successo', detail: 'Produto(s) Deletado(s)', life: 3000});
            this.buscarNotaItens();
          }, error =>  {

            this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao deletar', life: 3000});

          })

         
      }
  });
}

editProduct(product: ConferenciaCegaItem) {

  



  this.product = {...product};
  this.editando = true;
  this.productDialog = true;
}

deleteProduct(product: ConferenciaCegaItem) {
  this.confirmationService.confirm({
      message: 'Deseja deletar o produto ' + product.idProduto.nome + '?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel : 'Sim',
      rejectLabel : 'Não',
      accept: () => {
         
          this.service.deletarIten(product.id).subscribe(response => {

            this.itens = this.itens.filter(val => val.id !== product.id);
            this.product = {};
            this.messageService.add({severity:'success', summary: 'Successo', detail: 'Produto Deletado', life: 3000});
            this.buscarNotaItens();
          }, error => {
         //     console.log(error)
              this.messageService.add({severity:'error', summary: 'Erro', detail: 'Erro ao deletar', life: 3000});
          })
         
      }
  });
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
  
}




findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
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
 


  ngOnInit(): void {
    this.buscarNotaItens()
    this.carregarProdutos()
    this.carregarUnidades()

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: [ "domingo","segunda","terça","quarta","quinta","sexta","sábado" ],
      dayNamesShort: [ "dom","seg","ter","qua","qui","sex","sáb" ],
      dayNamesMin: [ "DOM","SEG","TER","QUA","QUI","SEX","SAB" ],
      monthNames: [ "janeiro","Fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro" ],
      monthNamesShort: [ "jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez" ],
      today: 'Hoje',
      clear: 'Limpar',
      
  }
    
  }

  buscarNotaItens(){
  //  console.log("pegou o codigo do parametreo " + this.codigo)
    return this.service.getNotaConferenciaItens(this.codigo).subscribe(response => {
  //    console.log(response)
      this.itens = response;
      this.loading = false
    })
  }

}
