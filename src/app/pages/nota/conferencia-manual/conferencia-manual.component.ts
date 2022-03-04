
import { LoginService } from './../../../services/login.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConferenciaManual } from './../../../model/conferenciaManual';
import { ConferenciaManualService } from './../../../conferencia-manual.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-conferencia-manual',
  templateUrl: './conferencia-manual.component.html',
  styleUrls: ['./conferencia-manual.component.css']
})
export class ConferenciaManualComponent implements OnInit {
  pt: { firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; monthNamesShort: string[]; today: string; clear: string; };
  conferenciaManual: ConferenciaManual;
  supervisor: any;
  finalizado:any

  paginaCarregada = false
  
  subscription: Subscription
  constructor(private service:ConferenciaManualService, private messageService:MessageService, private loginService:LoginService,  
    private rotaAtivada:ActivatedRoute, private router:Router, private confirmationService:ConfirmationService) { }

  usuario: any

  @ViewChild('dt') table: Table;

  loading = true

  filialId = this.rotaAtivada.snapshot.params['idFilial'];

  nomeFilial = this.rotaAtivada.snapshot.params['filialNome'];

  conferencias:any

  conferencia:{}

  conferenciaDialog: boolean;

  submitted: boolean;

  results: any[];

  fornecedoresList: any

  getColor(status) { (2)
    switch (status) {
      case true :
        return 'green';
      case null:
        return '#FFBF00';
      case false:
        return 'red';
    }
  }

  

  ngOnInit(): void {

    const source = interval(10000);
    
    this.subscription = source.subscribe(val => this.todos());

    this.getColor(status)

    this.supervisor = this.loginService.getSupervisorUsuarioAutenticado()

    

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

    this.usuario = this.loginService.getIdUsuarioAutenticado()

    this.todos()

    this.buscarFornecedores()
   
  }

  
  
  voltar() {

    let idFilial = localStorage.getItem('idFilial')

    this.router.navigate([`menu-dash/filial/${idFilial}/${this.nomeFilial}`])
  }

  todos() {
    this.service.todos(this.filialId).subscribe(r => {
      this.conferencias = r
      this.loading = false
   //   console.log(r)
     
    }, error => {
      this.messageService.add({severity : 'error', detail : 'Erro ao listar notas, pressione F5 ou tente novamente mais tarde', summary : 'Erro', sticky : true})
    }
    )
  }

  buscarFornecedores() {
    this.service.fornecedores().subscribe(r => {

      this.fornecedoresList = r

      
    
    }, error => {
       this.messageService.add({summary : 'Erro', detail : 'Ocorreu um erro ao listar fornecedores', severity : 'error', sticky : true})
    }
    )

  }

  search(event){
    
    this.results = this.fornecedoresList.filter(c => c.nome.toUpperCase().startsWith(event.query.toUpperCase()) || (c.codigo.startsWith(event.query)));
    
    //console.log(this.results)
  }


  openNew() {
    this.conferencia = {}
    this.submitted = false;
    this.conferenciaDialog = true;
    
}

hideDialog() {
  this.conferenciaDialog = false;
  this.submitted = false;
}

confere(event,fornecedor) {
  
   const fornecedorFormatado = fornecedor.replace('/' , '.');

  

  this.router.navigate([`notas/conferencia/manual/${event}/${fornecedorFormatado}`])
}

saveProduct(conferencia:ConferenciaManual) {
  this.submitted = true;

 

  if((conferencia.id != null)  && (conferencia.dataEmissao != null) && (conferencia.numeroNotaFiscal != null) && (conferencia.serieNotaFiscal != null) && (conferencia.valorNotaFiscal != null)) {
       this.paginaCarregada = true
      if (conferencia.id) {
          this.conferencias[this.findIndexById(conferencia.id)] = this.conferencia;                

          this.service.salvar(this.conferencia, this.usuario, this.filialId).subscribe(r=> {

          this.messageService.add({severity:'success', summary: 'Sucesso !', detail: 'Conferência Atualizada', life: 3000});

          this.todos();

          this.conferenciaDialog = false;

          this.paginaCarregada = false

          }, erro => {
            this.messageService.add({severity:'error', summary: 'Erro !', detail: 'Erro ao atualizar', life: 3000});
            this.todos();
            this.conferenciaDialog = false;
            this.paginaCarregada = false
            this.conferencias = [...this.conferencias];
    
            this.conferencia = {};
          }
          ) }
          
      }
      else {
     
        if(  (conferencia.dataEmissao != null) && (conferencia.numeroNotaFiscal != null) && (conferencia.serieNotaFiscal != null) && (conferencia.valorNotaFiscal != null)) {
          this.paginaCarregada = true
          this.service.salvar(this.conferencia, this.usuario, this.filialId).subscribe(r=> {

      

         
            this.todos()
            this.messageService.add({severity:'success', summary: 'Sucesso !', detail: 'Conferência Cadastrada', life: 3000});
            this.conferenciaDialog = false;
            this.paginaCarregada = false
            this.conferencias = [...this.conferencias];
    
            this.conferencia = {};

          }, erro => {
            this.messageService.add({severity:'error', summary: 'Erro !', detail: 'Erro ao cadastrar', life: 3000});
            this.conferenciaDialog = false;

            this.paginaCarregada = false

          }
          ) }

          
        
      }

    //  console.log(conferencia)

    
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



editProduct(conferencia: ConferenciaManual) {
  conferencia.dataEmissao = new Date(conferencia.dataEmissao)
  
  this.conferencia = {...conferencia};
 

  this.conferenciaDialog = true;
}

deleteProduct(conferencia: ConferenciaManual) {
  this.confirmationService.confirm({
      message: 'Você tem certeza que deseja deletar  ?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel : 'Sim',
      rejectLabel : 'Não',
      accept: () => {
          this.conferencias = this.conferencias.filter(val => val.id !== conferencia.id);
          this.service.deletar(conferencia.id).subscribe(
            r => {
              this.conferencia = new ConferenciaManual
              this.messageService.add({severity:'success', summary: 'Succeso!', detail: 'Conferência Deletada!', life: 3000});
              this.todos()
            }, erro => {
              this.messageService.add({severity:'error', summary: 'Erro!', detail: 'Erro ao deletar conferencia! Verfique se existem produtos nessa conferência!', life: 3000});
              this.todos()
            }
          )
         
      }
  });
}

aprovarConferencia(conferencia:ConferenciaManual){

            
 

//  this.conferencias[this.findIndexById(conferencia.id)] = this.conferenciaManual;      
  
 this.service.atualizarStatusAprovado(conferencia).subscribe(r=> {
 this.messageService.add({severity:'success', summary: 'Sucesso !', detail: `Confêrencia da nota ${conferencia.numeroNotaFiscal} - ${conferencia.fornecedor.nome} alterada para Aprovada`, life: 3000});

 this.conferencias = [...this.conferencias];
 this.conferenciaDialog = false;
 this.conferencia = new ConferenciaManual;
 this.todos()

 }, erro => {
   this.messageService.add({severity:'error', summary: 'Erro !', detail: 'Erro ao atualizar status da conferência!', life: 3000});
 }
 )

}



reprovarConferencia(conferencia:ConferenciaManual){

// this.conferencias[this.findIndexById(conferencia.id)] = this.conferenciaManual;                

this.service.atualizarStatusReprovado(conferencia).subscribe(r=> {

this.messageService.add({severity:'info', summary: 'Sucesso !', detail: `Confêrencia da nota ${conferencia.numeroNotaFiscal} - ${conferencia.fornecedor.nome} alterada para Reprovada`, life: 3000});

this.conferencias = [...this.conferencias];
this.conferenciaDialog = false;
this.conferencia = new ConferenciaManual;
this.todos()

}, erro => {
this.messageService.add({severity:'error', summary: 'Erro !', detail: 'Erro ao atualizar status da conferência!', life: 3000});
}
)

}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
