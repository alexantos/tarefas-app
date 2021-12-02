import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarefa } from './tarefas/tarefa.model';


@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(
    private http: HttpClient,
  ) {}

  todasTarefas(){
    return this.http.get<Tarefa[]>('http://165.227.96.131:8000/tarefas/');
  }

  criaTarefa(tarefa: Tarefa){
    return this.http.post<Tarefa>('http://165.227.96.131:8000/tarefas/', tarefa);
  }

  atualizarTarefa(tarefa: Tarefa){
    return this.http.patch<Tarefa>('http://165.227.96.131:8000/tarefas/'+String(tarefa.id)+'/', tarefa);
  }

  deletaTarefa(tarefa:Tarefa){
    return this.http.delete<Tarefa>('http://165.227.96.131:8000/tarefas/'+String(tarefa.id)+'/')
  }
}
