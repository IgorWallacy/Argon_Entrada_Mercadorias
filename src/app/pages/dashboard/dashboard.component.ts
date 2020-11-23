import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 
  empresas;

  constructor(private service:DashboardService,  private route:Router) {}

  ngOnInit() {

     this.service.getFilial().subscribe( r => {

      this.empresas = r
    })
  }
  
 nota(idFilial) {
  
   this.route.navigate([`/notas/filial/${idFilial}`])
 }

}