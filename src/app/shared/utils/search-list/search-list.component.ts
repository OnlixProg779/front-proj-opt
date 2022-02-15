import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ClientDto } from 'src/app/components/users/models/client-dto';
import { OptionsClient } from 'src/app/components/users/models/options-client';
import { ClientService } from 'src/app/components/users/services/client.service';
import { environment } from 'src/environments/environment';
import { CheckBoxViewComponent } from '../check-box-view/check-box-view.component';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {


  public filterSearchForm: FormGroup;

  @Output()
  submit: EventEmitter<ClientDto> = new EventEmitter<ClientDto>();


  filterThrottle = new Subject<string>();
  filterNumber = new Subject<string>();

  mostrarTabla: boolean = false;
  public closeResult: string;

  public optionsClient: OptionsClient = new OptionsClient();


  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private service: ClientService) {
    this.initSettingsClients();
    this.createFilterSearchForm();
  }



  initSettingsClients() {
    this.optionsClient.settings = {
      mode: 'external',
      pager: {
        display: true,
        perPage: this.optionsClient.showPerPage,
      },
      actions: {
        add: false,
        edit: false,
        delete: false
      },
      columns: {
        Button: {
          title: 'Add',
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
            // return `<a title="See Detail Product "href="Your api key or something/${row.Id}"> <i class="ion-edit"></i></a>`
            return "row"
          },
          filter: false,
          renderComponent: CheckBoxViewComponent,
          onComponentInitFunction: (instance) => {
            instance.eventEmit.subscribe((event) => {
              if (event) {
                this.submit.emit(instance.rowData);
              } else {
                this.submit.emit(null);

              }
            });
          },
        },
        serie: {
          title: '#',
          filter: false
        },
        name: {
          title: 'Name',
          filter: false
        },
        instagramName: {
          title: 'Instagram',
          filter: false
        },

        // phone: {
        //   title: 'Phone',
        //   filter: false
        // },

        city: {
          title: 'City',
          filter: false
        },
        dni: {
          title: 'Dni',
          filter: false
        },

      },
    };
  }


  ngOnInit(): void {
    var decoded: any = jwt_decode(sessionStorage.getItem('bearerToken'));
    // throw new Error('Method not implemented.');

    if (decoded.CanAccessManage == 'true') {
      this.optionsClient.auxMediaTypeAccept = environment.mediaTypes.client.get.accept.getAllclientToOwnerJson;

    }
    else {
      this.optionsClient.auxMediaTypeAccept = environment.mediaTypes.client.get.accept.getAllclientToEmployeeAJson;

    }


    // this.optionsClient.active = true;
    // this.optionsClient.fields = 'type,active';


    this.initData()
    this.filterThrottle.pipe(debounceTime(1000)).subscribe((input) => {
      this.submit.emit(null);
      this.searchFilter(input, "searchQuery");
    });
    this.filterNumber.pipe(debounceTime(1000)).subscribe((input) => {
      this.submit.emit(null);
      this.searchFilter(input, "searchNumber");
    });
    this.initOnChagedData();
  }


  createFilterSearchForm() {
    this.filterSearchForm = this.formBuilder.group({
      searchQuery: [''],
      searchNumber: ['']
    })
  }

  searchFilter(action: any, search: string) {

    console.log(search)
    console.log(action)
    
    if (action == 'button' && search == 'button') {
      this.optionsClient.searchQuery = this.filterSearchForm.controls['searchQuery'].value;
      this.optionsClient.serie = this.filterSearchForm.controls['searchNumber'].value;
      this.initData();

    } else if (search == 'searchQuery') {
      this.optionsClient.searchQuery = action;
      this.optionsClient.serie = null;

      this.initData();
    } else if (search == 'searchNumber') {
      this.optionsClient.searchQuery = null;
      this.optionsClient.serie = action;
      this.initData();
    }

  }


  vaciarInputQuery() {
    this.filterSearchForm.controls['searchQuery'].setValue("");
  }

  vaciarInputNumber() {
    this.filterSearchForm.controls['searchNumber'].setValue("");
  }

  initData() {
    let params = new HttpParams();

    if ((this.optionsClient.searchQuery == null || this.optionsClient.searchQuery == '') && (this.optionsClient.serie == null )) {
      this.mostrarTabla = false;
      this.optionsClient.source.empty();
      return
    } else {
      if (this.optionsClient.searchQuery != null) {
        params = params.append('SearchQuery', this.optionsClient.searchQuery);
      }
      if (this.optionsClient.serie != null) {
        params = params.append('Serie', this.optionsClient.serie);
      }
    }

    if (this.optionsClient.orderBy != null) {
      params = params.append('OrderBy', this.optionsClient.orderBy);
    }
    if (this.optionsClient.fields != null) {
      params = params.append('Fields', this.optionsClient.fields);
    }
    params = params.append('PageNumber', this.optionsClient.currentPage.toString());
    params = params.append('PageSize', this.optionsClient.pageSize.toString());
    this.service
      .getAllClients(params, this.optionsClient.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          if (this.optionsClient.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
            this.optionsClient.source.load(result.body.value);
            this.mostrarTabla = true;
            this.optionsClient.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsClient.totalCount = this.optionsClient.totalCount['totalCount'];
          } else {
            this.optionsClient.source.load(result.body);
            this.mostrarTabla = true;
            this.optionsClient.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsClient.totalCount = this.optionsClient.totalCount['totalCount'];
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }

  initOnChagedData() {
    this.optionsClient.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChange(change.paging.page);
      }
    });
  }

  pageChange(pageIndex) {
    var getNew = pageIndex * this.optionsClient.showPerPage;
    if (getNew >= this.optionsClient.source.count() && getNew < this.optionsClient.totalCount) {
      this.optionsClient.currentPage = this.optionsClient.currentPage + 1;
      let params = new HttpParams();
      if ((this.optionsClient.searchQuery == null || this.optionsClient.searchQuery == '') && (this.optionsClient.serie == null )) {
        this.mostrarTabla = false;
        this.optionsClient.source.empty();
        return
      } else {
        if (this.optionsClient.searchQuery != null) {
          params = params.append('SearchQuery', this.optionsClient.searchQuery);
        }
        if (this.optionsClient.serie != null) {
          params = params.append('Serie', this.optionsClient.serie);
        }
      }
      if (this.optionsClient.orderBy != null) {
        params = params.append('OrderBy', this.optionsClient.orderBy);
      }
      if (this.optionsClient.fields != null) {
        params = params.append('Fields', this.optionsClient.fields);
      }
      params = params.append('PageNumber', this.optionsClient.currentPage.toString());
      params = params.append('PageSize', this.optionsClient.pageSize.toString());
      this.service
        .getAllClients(params, this.optionsClient.auxMediaTypeAccept)
        .subscribe((result: HttpResponse<any>) => {
          if (!result) {
            return;
          }
          if (result.status == 200) {
            if (this.optionsClient.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
              result.body.value.forEach((element) => {
                this.optionsClient.source.add(element);
              });
            } else {
              result.body.forEach((element) => {
                this.optionsClient.source.add(element);
              });
            }
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
        });
    }

  }

  createClientModal(content) {
    // aqui se abre el modal
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(
            reason
          )}`;
        }
      );
  }


  private getDismissReason(
    reason: any
  ): string {
    console.log(reason);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason == 'Cross click') {
      return 'Cross click';
    } else {
      return `with: ${reason}`;
    }
  }

  responseNewClient(responseClient: ClientDto) {
    if (responseClient.clientId) {
      this.submit.emit(responseClient);
      this.modalService.dismissAll();
    }
  }
}
