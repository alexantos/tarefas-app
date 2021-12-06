import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TarefaComponent } from '../tarefa/tarefa.component';
import { TarefasService } from '../tarefas.service';

export interface Tarefa {
  descricao?: string;
  realizado?: boolean;
  data?: Date;
  prioridade?: string;
}

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css'],
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];

  constructor(public dialog: MatDialog, private tarefasService: TarefasService) {}

  ngOnInit(): void {
    this.tarefasService.listaTarefas().subscribe((tarefas) =>{
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
        this.tarefas.push(tarefa_adicionar);
      }
    });
  }

  atualizaTarefa(tarefa: Tarefa) {
    let tarefa_enviar = {
      descricao: tarefa.descricao,
      prioridade: tarefa.prioridade,
    };
    const dialogRef = this.dialog.open(TarefaComponent, {
      width: '25em',
      data: tarefa_enviar,
    });
    dialogRef.afterClosed().subscribe((tarefa_modal) => {
      this.tarefas.forEach((tarefa_elemento) => {
        if (tarefa_elemento == tarefa) {
          tarefa_elemento.descricao = tarefa_modal.descricao;
          tarefa_elemento.prioridade = tarefa_modal.prioridade;
        }
      });
    });
  }

  mudaFinalizado(tarefa: Tarefa){
    tarefa.realizado = !tarefa.realizado;
  }

  deletaTarefa(tarefa: Tarefa) {
    this.tarefas.splice(this.tarefas.indexOf(tarefa), 1)
  }
}
