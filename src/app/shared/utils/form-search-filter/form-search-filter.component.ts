import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form-search-filter',
  templateUrl: './form-search-filter.component.html',
  styleUrls: ['./form-search-filter.component.scss']
})
export class FormSearchFilterComponent implements OnInit {

  public filterSearchForm: FormGroup;
  searchQuery: string;
  searchNumber: number;

  filterThrottle = new Subject<string>();
  filterNumber = new Subject<string>();

  @Output()
  submit: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  submitNumber: EventEmitter<number> = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder) {
    this.createFilterSearchForm();

  }

  createFilterSearchForm() {
    this.filterSearchForm = this.formBuilder.group({
      searchQuery: [''],
      searchNumber: ['']
    })
  }  


  searchFilter(action: any, search: string) {
    console.log(search)
    if (action == 'button' && search == 'button') {
      this.searchQuery = this.filterSearchForm.controls['searchQuery'].value
      this.searchNumber = this.filterSearchForm.controls['searchNumber'].value

      if(this.searchQuery){
        this.submit.emit(this.searchQuery);
      }else{
        this.submitNumber.emit(this.searchNumber);
      }
    } else if (search == 'searchQuery') {
       this.submit.emit(action);
    } else if(search == 'searchNumber'){
      console.log("Entro")
      this.submitNumber.emit(action);
    }

  }

  vaciarInputQuery(){
    this.filterSearchForm.controls['searchQuery'].setValue("");
  }

  vaciarInputNumber(){
    this.filterSearchForm.controls['searchNumber'].setValue("");
  }

  ngOnInit(): void {
    this.filterThrottle.pipe(debounceTime(1000)).subscribe((input) => {
      this.submit.emit(null);
      this.searchFilter(input, "searchQuery");
    });
    this.filterNumber.pipe(debounceTime(1000)).subscribe((input) => {
      this.submitNumber.emit(null);
      this.searchFilter(input, "searchNumber");
    });
  }

}
