import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit{
  isShowAddExchange: boolean = false;
  constructor() {
  }
  
  ngOnInit(){
  }

  addExchangeRate(){
    this.isShowAddExchange = true;
  }

  cancelExchangeRate(){
    this.isShowAddExchange = false;
  }

  EditExchangeRate(){
    this.isShowAddExchange = true;
  }
}