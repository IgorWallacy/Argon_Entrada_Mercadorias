
import { Produto } from './../../../../model/Produto';
import { NotaService } from './../../../../services/nota.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenciaCegaItem } from 'src/app/model/conferenciaCegaItem';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
  
})
export class ItemComponent implements OnInit {
  
  produtos:any = []
  unidades:any = []

  
  
  filteredBrands: any[];
  brands: any;
  produtoResult: any[];
  unidadeResult: any;

  produto:Produto
  pt: { firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; monthNamesShort: string[]; today: string; clear: string; };
  
  editando: boolean = false;
  
  

  constructor(private service:NotaService, private rotaAtivada:ActivatedRoute, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  productDialog: boolean;
  abrirCameraDialog: boolean

  produtoLido:string

  product: {};

  selectedProducts: ConferenciaCegaItem[];

  submitted: boolean;

  products: ConferenciaCegaItem[];

  scannerEnabled : boolean
  

  codigo = this.rotaAtivada.snapshot.params['codigo'];

  idFilial = this.rotaAtivada.snapshot.params['filialId'];

  itens

  abrirCamera(){
    this.abrirCameraDialog = true

    this.scannerEnabled = true
    
    
  }

  fecharCamera() {
    this.scannerEnabled = false

   
  }

  

  carregarUnidades(){

    this.service.getUnidades().subscribe(response => {
      this.unidades = response
    })
  }

  carregarProdutos(){

    this.service.getProdutos().subscribe(response => {
      this.produtos = response
    })
  }

  scan(leitor) {

    

    this.messageService.add({severity:'success', life: 5000, summary:'Código lido ... ', detail: `${leitor}`});
    
    //this.abrirCameraDialog = false

    

    const lido = leitor

    this.produtoResult = this.produtos.filter(c =>  c.ean.startsWith(`${lido}`));

    const contador = Object.entries(this.produtoResult).length;

    if(contador === 0){
      this.messageService.add({severity:'error', life: 5000 , summary:'Produto não encontrado ', detail: `Digite o nome ou o código ou tente novamente a leitura`});
      this.fecharCamera();
    }
    
    this.product = { idConferencia : {
      id : this.codigo
    },
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
  this.scannerEnabled = false
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
    })
  }

}
