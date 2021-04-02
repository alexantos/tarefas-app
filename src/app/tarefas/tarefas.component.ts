import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../tarefa.service';
import { TarefaModel } from './tarefa.model';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  tarefas: TarefaModel[] = [];

  descricao: string = '';

  descricao_atualizar: string = '';

  tarefa_atualizar: TarefaModel = {descricao:''};

  constructor(
    private tarefaService: TarefaService
  ) { }

  ngOnInit(): void {
   this.todasTarefas();
  }

  todasTarefas(){
    this.tarefaService.todasTarefas().subscribe((tarefas)=>{
      this.tarefas = tarefas
    })
  }

  adicionarTarefa() {
    let tarefa: TarefaModel = {
      descricao: this.descricao
    }
    this.tarefaService.criaTarefa(tarefa).subscribe((result)=>{
      this.todasTarefas();
    })
  }

  selecionaTarefa(tarefa:TarefaModel){
    this.tarefa_atualizar = tarefa;
  }

  realizaTarefa(tarefa:TarefaModel, event:Event){
    event.stopPropagation();
    tarefa.realizado = !tarefa.realizado;
    if(tarefa.realizado){
      // let data = new Date("YYYY-MM-DDTHH:mm:ss.sTZD");
      // tarefa.data_hora_realizado = data.toString();
    }
    this.atualizaTarefa(tarefa)
  }

  atualizaTarefa(tarefa:TarefaModel){
    this.tarefaService.atualizarTarefa(tarefa).subscribe((result)=>{
      this.todasTarefas();
    });
  }

  atualizaDescricao(){
    this.atualizaTarefa(this.tarefa_atualizar);
  }

  deletaTarefa(tarefa:TarefaModel, event:Event){
    event.stopPropagation();
    this.tarefaService.deletaTarefa(tarefa).subscribe((result)=>{
      this.todasTarefas();
    })
  }

}
