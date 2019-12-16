import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor() {
  }

  @Input()
  public set temperature(newTemp: number) {
    // console.log(`New temperature ${newTemp} Celsius.`);
    this.localTemperatures[0].data.push(newTemp);
    if (this.localTemperatures[0].data.length <= 10 && this.localTemperatures[0].data.length > 0) {
      this.temperatureTimeline.push(`${this.temperatureTimeline.length}`);
    } else {
      this.localTemperatures[0].data = this.localTemperatures[0].data.slice(1, this.localTemperatures[0].data.length);
    }
  }

  @Input()
  public set humidity(newHumidity: number) {
    // console.log(`New Humidity ${newHumidity}%.`);
    this.localHumidity[0].data.push(newHumidity);
    if (this.localHumidity[0].data.length <= 10 && this.localHumidity[0].data.length > 0) {
      this.humidityTimeline.push(`${this.humidityTimeline.length}`);
    } else {
      this.localHumidity[0].data = this.localHumidity[0].data.slice(1, this.localHumidity[0].data.length);
    }
  }

  private localTemperatures: ChartDataSets[] = [{
    data: [],
    label: 'Temperature'
  }];

  private localHumidity: ChartDataSets[] = [{
    data: [],
    label: 'Humidity'
  }];

  temperatureTimeline: Label[] = [];
  humidityTimeline: Label[] = [];

  ngOnInit(): void {
  }

  getChartColors(isTemperatureChart: boolean): Color[] {
    return [{
      backgroundColor: isTemperatureChart ? 'rgba(255, 31, 31, 0.2)' : 'rgba(0, 4, 245, 0.2)',
      borderColor: isTemperatureChart ? 'rgba(255, 31, 31, 1)' : 'rgba(0, 4, 245, 1)',
      pointBorderColor: '#fff',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];
  }

  getChartOptions(isTemperatureChart: boolean): ChartOptions {
    const options: ChartOptions = {
      responsive: true,
      title: {
        display: true,
        text: isTemperatureChart ? 'Temperature' : 'Humidity',
        fontSize: 20,
        fontColor: isTemperatureChart ? 'red' : 'blue'
      },
      legend: {
        display: false
      }
    };
    if (!isTemperatureChart) {
      options.layout = {
        padding: {
          top: 20
        }
      };
    }
    return options;
  }
}
