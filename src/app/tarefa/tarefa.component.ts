import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarefa } from '../tarefas.interface';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css'],
})
export class TarefaComponent implements OnInit {

  prioridades: string[] = ['Urgente', 'Média', 'Tranquila'];

  update = false;

  constructor(
    public dialogRef: MatDialogRef<TarefaComponent>,
    @Inject(MAT_DIALOG_DATA) public tarefa: Tarefa
  ) {
    if (this.tarefa?.descricao != undefined || this.tarefa?.descricao != null){
      this.update = true;
    }
  }

  ngOnInit(): void {
  }

  fechaModal() {
    this.dialogRef.close();
  }

  salvaTarefa() {
    if (!this.update){
      this.tarefa.data = new Date();
      this.tarefa.realizado = false;
    }
    this.dialogRef.close(this.tarefa);
  }
}
