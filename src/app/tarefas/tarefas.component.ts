import { Component, OnInit } from '@angular/core';

export interface Tarefa {
  descricao?: string;
  finalizado?: boolean;
  data?: Date;
  prioridade?: string;
}

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  tarefas: Tarefa[] = [];

  constructor() { }

  ngOnInit(): void {
    this.tarefas.push({descricao: "Lavar a moto", finalizado: false, data: new Date(), prioridade: 'Média'});
    this.tarefas.push({descricao: "Lavar a moto 2", finalizado: true, data: new Date(), prioridade: 'Tranquila'});
  }

}
