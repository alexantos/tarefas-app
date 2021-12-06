import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../tarefas.interface';
import { TarefasService } from '../tarefas.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  grafico_pizza: any = {}

  grafico_barra: any = {}

  constructor(private tarefasService: TarefasService) {
    this.grafico_pizza['type'] = 'pie';
    this.grafico_barra['type'] = 'bar';
  }

  ngOnInit(): void {
    this.constroiGraficoPizza();
    this.constroiGraficoBarra();
  }

  constroiGraficoPizza(): void {
    let realizado = 0;
    let total = 0;
    let nao_realizado = 0;
    this.tarefasService.listaTarefas().subscribe((tarefas: Tarefa[]) => {
      total = tarefas.length;
      realizado = tarefas.filter((tarefa) => tarefa.realizado == true).length;
      nao_realizado = total - realizado;
      this.grafico_pizza['data'] = {
        labels: [
          'Finalizados',
          'Não Finalizados'
        ],
        datasets: [{
          label: 'Finalizados',
          data: [realizado, nao_realizado],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
          ],
          hoverOffset: 4
        }]
      };
    })
    this.grafico_pizza['options'] = {
      responsive: true,
    };
  }

  constroiGraficoBarra(): void {
    this.grafico_barra['data'] = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
    this.grafico_pizza['options'] = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

}

