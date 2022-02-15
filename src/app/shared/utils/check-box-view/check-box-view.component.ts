import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-check-box-view',
  templateUrl: './check-box-view.component.html',
  styleUrls: ['./check-box-view.component.scss']
})
export class CheckBoxViewComponent implements OnInit {

  constructor() { }
  @Input() value: any;

  @Input() rowData: any;

  // @Output() save: EventEmitter<any> = new EventEmitter();

  @Output() eventEmit: EventEmitter<Event> = new EventEmitter();

  ngOnInit(): void {
  }

  onCheckboxChange(event) {


   //   this.save.emit(this.rowData);
      this.eventEmit.emit(event.target.checked);

 
  }

}
