import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TarefaModel } from './tarefas/tarefa.model';


@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(
    private http: HttpClient,
  ) {}

  todasTarefas(){
    return this.http.get<TarefaModel[]>('http://165.227.96.131:8000/tarefas/');
  }

  criaTarefa(tarefa: TarefaModel){
    return this.http.post<TarefaModel>('http://165.227.96.131:8000/tarefas/', tarefa);
  }

  atualizarTarefa(tarefa: TarefaModel){
    return this.http.patch<TarefaModel>('http://165.227.96.131:8000/tarefas/'+String(tarefa.id)+'/', tarefa);
  }

  deletaTarefa(tarefa:TarefaModel){
    return this.http.delete<TarefaModel>('http://165.227.96.131:8000/tarefas/'+String(tarefa.id)+'/')
  }
}
