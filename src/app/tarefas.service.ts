import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})

export class TarefasService {
    constructor(private http: HttpClient){}

    listaTarefas(): Observable<any>{
        return this.http.get<any>(environment.urlApi + 'tarefas/')
    }
}