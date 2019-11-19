import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  constructor() { }

  tempData: Array<number> = [0, 0, 0, 0, 0, 0, 0];
  humidData: Array<number> = [0, 0, 0, 0, 0, 0, 0];
  tempTime: Array<string> = ['0', '0', '0', '0', '0', '0', '0'];
  humidTime: Array<string> = ['0', '0', '0', '0', '0', '0', '0'];

  public updateChart(temp: number, humid: number, tChangeTime: string, hChangeTime: string) {
    console.log(temp.toString() + ' ' + humid.toString() + ' ' + this.tempTime + ' ' + this.humidTime);
    if (temp != this.tempData[6]) {
      console.log('got here2');

      this.tempData.shift();
      this.tempTime.shift();
      this.tempData.push(temp);
      this.tempTime.push(tChangeTime);

    }

    if (humid != this.humidData[6]) {
      console.log('got here3');

      this.humidData.shift();
      this.humidTime.shift();
      this.humidData.push(humid);
      this.humidTime.push(hChangeTime);
    }
    console.log('got here4');

  }

  public test() {
    console.log('got here1');
    this.updateChart(10, 100, '11:00', '11:00');
  }

  public tempChart = {
    id: 'temperature',
    lineChartData: [
      { data: this.tempData, label: 'Temperature' }
    ],
    lineChartLabels: this.tempTime,
    lineChartOptions: {
      responsive: true,
      title: {
        display: true,
        text: 'Temperature',
        fontSize: 20,
        fontColor: 'red'
      },
      legend: {
        display: false
      }
    },
    lineChartColors: [
      {
        backgroundColor: 'rgba(255, 31, 31, 0.2)',
        borderColor: 'rgba(255, 31, 31, 1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ],
    lineChartType: 'line'
  };

  public humiChart = {
    id: 'humidity',
    lineChartData: [
      { data: this.humidData, label: 'Humidity' }
    ],
    lineChartLabels: this.humidTime,
    lineChartOptions: {
      responsive: true,
      layout: {
        padding: {
          top: 20
        }
      },
      title: {
        display: true,
        text: 'Humidity',
        fontSize: 20,
        fontColor: 'rgba(0, 4, 245, 0.7)'
      },
      legend: {
        display: false
      }
    },
    lineChartColors: [
      {
        backgroundColor: 'rgba(0, 4, 245, 0.2)',
        borderColor: 'rgba(0, 4, 245, 1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ],
    lineChartType: 'line'
  };

  public charts = [this.tempChart, this.humiChart];

  ngOnInit() { }
}
