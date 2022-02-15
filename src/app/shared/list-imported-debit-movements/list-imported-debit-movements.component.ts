import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-imported-debit-movements',
  templateUrl: './list-imported-debit-movements.component.html',
  styleUrls: ['./list-imported-debit-movements.component.scss']
})
export class ListImportedDebitMovementsComponent implements OnInit {

  @Input()
  bankAccountId: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
