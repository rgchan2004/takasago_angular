import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-freight-rate',
  templateUrl: './freight-rate.component.html',
  styleUrls: ['./freight-rate.component.css']
})
export class FreightRateComponent implements OnInit{
  isShowAddFreight: boolean = false;
  constructor() {
  }
  
  ngOnInit(){
  }

  addFreightRate(){
    this.isShowAddFreight = true;
  }

  cancelFreightRate(){
    this.isShowAddFreight = false;
  }

  EditFreightRate(){
    this.isShowAddFreight = true;
  }
}
