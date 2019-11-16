import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AngularFireDatabase } from '@angular/fire/database';
import { RealtimeDBService } from '../../services/firebase/realtime-db.service';
import { Module } from 'src/models/Module';
@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent implements OnInit {
  ngOnInit() {
  }

  room: Module;
  temp: String;
  humid: String;
  homesModule: Array<Object> = [];
  module: Module;
  constructor(public dialogRef: MatDialogRef<DetailInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private firebase: AngularFireDatabase, public firebase_service: RealtimeDBService) {
    this.room = new Module(data.room.MAC, data.room.name, firebase);
    console.log(this.room);
    this.temp = Math.round(this.room.temperature).toString();
    this.humid = Math.round(this.room.humidity).toString();
  }

  saveNameChange() {
    this.firebase.list(`/modules`).update(`${this.room.MAC}`, { name: this.room.name });
    console.log(this.room);
  }

  switchLight() {
    this.room.switchLight();
  }

  //Chart component
  // [].push(this.room.temperature)
  public temp_chart = {
    id: 'temperature',
    lineChartData: [
      { data: [100, 200, 50], label: 'Temperature' },
    ],
    lineChartLabels: ['11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00'],
    lineChartOptions: {
      responsive: true,
      title: {
        display: true,
        text: 'Temperature',
        fontSize: 20,
        fontColor: 'red',
      },
      legend: {
        display: false
      }
    },
    lineChartColors: [{
      backgroundColor: 'rgba(255, 31, 31, 0.2)',
      borderColor: 'rgba(255, 31, 31, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }],
    lineChartType: 'line',
  }

  public humi_chart = {
    id: 'humidity',
    lineChartData: [
      { data: [100, 200, 50], label: 'Humidity' },
    ],
    lineChartLabels: ['11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00'],
    lineChartOptions: {
      responsive: true,
      layout: {
        padding: {
          top: 20,
        }
      },
      title: {
        display: true,
        text: 'Humidity',
        fontSize: 20,
        fontColor: 'rgba(0, 4, 245, 0.7)',
      },
      legend: {
        display: false
      }
    },
    lineChartColors: [{
      backgroundColor: 'rgba(0, 4, 245, 0.2)',
      borderColor: 'rgba(0, 4, 245, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }],
    lineChartType: 'line',
  }

  public charts = [this.temp_chart, this.humi_chart];


}
