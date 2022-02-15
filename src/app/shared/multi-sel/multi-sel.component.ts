import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-multi-sel',
  templateUrl: './multi-sel.component.html',
  styleUrls: ['./multi-sel.component.scss']
})
export class MultiSelComponent implements ViewCell, OnInit {

  @Input() value;
  @Input() rowData: any;

  model: ResourceMultiSel = new ResourceMultiSel();

  @Output() save: EventEmitter<SentActionPatchDeposit> = new EventEmitter<SentActionPatchDeposit>();

  constructor(private papa: Papa) { }


  ngOnInit(): void {
    // let csvData = '"Hello","World!"';
    // let options = {
    //   complete: (results, file) => {
    //     console.log('Parsed: ', results, file);
    //   }
    //   // Add your options here
    // };

    // this.papa.parse(csvData, options);
    this.separarData(this.value);
  }

  private separarData(value: ResourceMultiSel) {
    this.model.action = value.action;
    this.model.renderOptions = value.renderOptions;
    this.model.stepClass = value.stepClass;
    this.model.styl = value.styl;
  }

  onClick(action: string) {
    var aux = new SentActionPatchDeposit();
    aux.entity = this.rowData;
    aux.option = action;
    this.save.emit(aux);
  }

  selectedCSVFileName: any;
  isCSV_Valid: boolean;

    // LOAD CSV FILE FROM INPUT
    fileChangeListener($event: any): void {

      const files = $event.srcElement.files;
  
      if (files !== null && files !== undefined && files.length > 0) {
        this.selectedCSVFileName = files[0].name;
  
        const reader: FileReader = new FileReader();
        reader.readAsText(files[0], 'utf-8');
        reader.onload = e => {
  
          const csv = reader.result;
          const results = this.papa.parse(csv as string, {
            header: false,
            encoding: "utf-8"
          });
  
          // VALIDATE PARSED CSV FILE
          if (results !== null && results !== undefined && results.data !== null &&
            results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
            this.isCSV_Valid = true;
  
            // PERFORM OPERATIONS ON PARSED CSV
            var aux = new SentActionPatchDeposit();

            aux.csvTableHeader = results.data[0];
  
            aux.csvTableData = [...results.data.slice(1, results.data.length)];
            
            //
            aux.entity = this.rowData;
            aux.option = "FILE UPLOAD";
            this.save.emit(aux);
            //
            //this.filterCreditMovements(csvTableData);
            //this.filterDebitMovements(csvTableData);
  
          } else {
            for (let i = 0; i < results.errors.length; i++) {
              console.log('Error Parsing CSV File: ', results.errors[i].message);
            }
          }
        };
      } else {
        console.log('No File Selected');
      }
  
    }

}

export class ResourceMultiSel {
  constructor() { }

  renderOptions: string[];
  stepClass: string[];
  action: string[];
  styl: string[];
  // idReference: string;
  // clientId: string;
  entity: any;
}

export class SentActionPatchDeposit{
  constructor(){}

  entity: any;
  option: string;
  csvTableData: any[];
  public csvTableHeader: [];
}