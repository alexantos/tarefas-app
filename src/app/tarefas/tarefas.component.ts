import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../tarefa.service';
import { Tarefa } from './tarefa.model';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  tarefas: Tarefa[] = [];

  descricao: string = '';

  tarefa_atualizar: Tarefa = {descricao:''};

  prioridades: string[] = ['Máxima', 'Média', 'Mínima'];

  prioridade: string = '';

  constructor(
    private tarefaService: TarefaService
  ) { }

  ngOnInit(): void {
  //  this.todasTarefas();
   this.tarefas.push({descricao:"Teste Android"})
  }

  todasTarefas(){
    this.tarefaService.todasTarefas().subscribe((tarefas)=>{
      this.tarefas = tarefas
    })
  }

  adicionarTarefa() {
    let tarefa: Tarefa = {
      descricao: this.descricao,
      prioridade: this.prioridade
    }
    this.tarefas.push(tarefa)
    // this.tarefaService.criaTarefa(tarefa).subscribe((result)=>{
    //   this.todasTarefas();
    // })
  }

  selecionaTarefa(tarefa:Tarefa){
    this.tarefa_atualizar = tarefa;
  }

  realizaTarefa(tarefa:Tarefa, event:Event){
    event.stopPropagation();
    tarefa.realizado = !tarefa.realizado;
    if(tarefa.realizado){
      // let data = new Date("YYYY-MM-DDTHH:mm:ss.sTZD");
      // tarefa.data_hora_realizado = data.toString();
    }
    // this.atualizaTarefa(tarefa)
  }

  atualizaTarefa(tarefa:Tarefa){
    // this.tarefaService.atualizarTarefa(tarefa).subscribe((result)=>{
    //   this.todasTarefas();
    // });
  }

  atualizaDescricao(){
    this.atualizaTarefa(this.tarefa_atualizar);
  }

  deletaTarefa(tarefa:Tarefa, event:Event){
    this.tarefas.splice(this.tarefas.indexOf(tarefa), 1)
    // this.tarefaService.deletaTarefa(tarefa).subscribe((result)=>{
    //   this.todasTarefas();
    // })
  }

}
