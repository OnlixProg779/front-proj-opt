import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-button-view',
  templateUrl: './button-view.component.html',
  styleUrls: ['./button-view.component.scss']
})
export class ButtonViewComponent implements ViewCell, OnInit {
 
  constructor(){
  }

  @Input() value: string | number;

  @Input() rowData: any;


    renderValue: any = 'NULL';
    step: any = "bg-primary";
    styl: any = "";

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.separarData(this.value);
  }

  onClick() {
    this.save.emit(this.rowData);
  }

  private separarData(value: string | number){
    if (typeof value == 'string'){

    var aux =  JSON.parse(value);
    this.renderValue = Object.values(aux)[0]
    this.step = Object.values(aux)[1]
    this.styl = Object.values(aux)[2];
    }else{
      this.renderValue = value;
    }
  }
}
