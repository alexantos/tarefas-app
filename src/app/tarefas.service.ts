import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tarefa } from './tarefas.interface';

@Injectable({
    providedIn: 'root',
})

export class TarefasService {

    url: string = environment.urlApi + 'tarefas/';

    constructor(private http: HttpClient) { }

    listaTarefas(): Observable<any> {
        return this.http.get<any>(this.url)
    }

    criaTarefa(tarefa: Tarefa) {
        return this.http.post<Tarefa>(this.url, tarefa);
    }

    atualizarTarefa(tarefa: Tarefa) {
        return this.http.patch<Tarefa>(this.url + String(tarefa.id) + '/', tarefa);
    }

    deletaTarefa(tarefa: Tarefa) {
        return this.http.delete<Tarefa>(this.url + String(tarefa.id) + '/')
    }
}