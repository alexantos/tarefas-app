import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TarefaComponent } from '../tarefa/tarefa.component';
import { TarefasService } from '../tarefas.service';
import { Tarefa } from '../tarefas.interface';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css'],
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];

  constructor(public dialog: MatDialog, private tarefasService: TarefasService) { }

  ngOnInit(): void {
    this.atualizaListaTarefas();
  }

  atualizaListaTarefas(){
    this.tarefasService.listaTarefas().subscribe((tarefas) => {
      this.tarefas = tarefas;
    })
  }

  adicionaTarefa() {
    let tarefa = {};
    const dialogRef = this.dialog.open(TarefaComponent, {
      width: '25em',
      data: tarefa,
    });
    dialogRef.afterClosed().subscribe((tarefa_adicionar) => {
      if (
        tarefa_adicionar?.descricao != undefined ||
        tarefa_adicionar?.descricao != null
      ) {
        this.tarefasService.criaTarefa(tarefa_adicionar).subscribe((retorno)=>{
          console.log(retorno);
          this.atualizaListaTarefas();
        });
      }
    });
  }

  atualizaTarefa(tarefa: Tarefa) {
    let tarefa_enviar = {
      id: tarefa.id,
      descricao: tarefa.descricao,
      prioridade: tarefa.prioridade,
      realizado: tarefa.realizado,
    };
    const dialogRef = this.dialog.open(TarefaComponent, {
      width: '25em',
      data: tarefa_enviar,
    });
    dialogRef.afterClosed().subscribe((tarefa_modal) => {
      this.tarefasService.atualizarTarefa(tarefa_modal).subscribe((retorno)=>{
        console.log(retorno);
        this.atualizaListaTarefas();
      });
    });
  }

  mudaFinalizado(tarefa: Tarefa) {
    tarefa.realizado = !tarefa.realizado;
    this.tarefasService.atualizarTarefa(tarefa).subscribe((retorno)=>{
      console.log(retorno);
      this.atualizaListaTarefas();
    });
  }

  deletaTarefa(tarefa: Tarefa) {
    this.tarefasService.deletaTarefa(tarefa).subscribe((retorno)=>{
      console.log(retorno);
      this.atualizaListaTarefas();
    });
  }
}
