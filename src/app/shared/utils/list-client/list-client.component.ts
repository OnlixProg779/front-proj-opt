import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { OptionsClient } from 'src/app/components/users/models/options-client';
import { ClientService } from 'src/app/components/users/services/client.service';
import { ButtonViewComponent } from 'src/app/shared/button-view/button-view.component';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
})
export class ListClientComponent implements OnInit {
  //Client
  public optionsClient: OptionsClient = new OptionsClient();


  constructor(private service: ClientService, private router: Router) {
    this.initSettingsClients();

  }
  
  initSettingsClients(){
    this.optionsClient.settings = {
      mode: 'external',
      pager: {
        display: true,
        perPage: this.optionsClient.showPerPage,
      },
      actions: {
        add: false,
        edit: true,
        delete: false,
        position: 'right',
      },
      columns: {
        serie: {
          title: '#',
          filter: false,
          // type: 'custom',
          // valuePrepareFunction: (value, row, cell) => {
          //   var sentData = {
          //     renderValue: 'Profile',
          //     step: 'btn btn-primary',
          //   };
  
          //   return JSON.stringify(sentData);
          // },
          // renderComponent: ButtonViewComponent,
          // onComponentInitFunction: (instance) => {
          //   instance.save.subscribe((row) => {
          //     this.router.navigate(['/clients/bills/' + row.clientId]);
          //   });
          // },
        },
        button1: {
          title: 'History',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
            var sentData = {
              renderValue: 'Profile',
              step: 'btn btn-primary',
            };
  
            return JSON.stringify(sentData);
          },
          renderComponent: ButtonViewComponent,
          onComponentInitFunction: (instance) => {
            instance.save.subscribe((row) => {
              this.router.navigate(['/clients/bills/' + row.clientId]);
            });
          },
        },
        name: {
          title: 'Name',
          filter: false,
        },
  
        instagramName: {
          title: 'Instagram',
          filter: false,
        },
  
        phone: {
          title: 'Phone',
          filter: false,
        },
  
        city: {
          title: 'City',
          filter: false,
        },
      },
    };
  }




  ngOnInit() {
    var decoded: any = jwt_decode(sessionStorage.getItem('bearerToken'));
    // console.log(decoded)
    // throw new Error('Method not implemented.');

    if (decoded.CanAccessManage == 'true') {
      this.optionsClient.auxMediaTypeAccept = environment.mediaTypes.client.get.accept.getAllclientToOwnerJson;

    }
    else {
      console.log("entroe aqui")
      this.optionsClient.auxMediaTypeAccept = environment.mediaTypes.client.get.accept.getAllclientToEmployeeAJson;

    }
    this.initData();

    this.initOnChagedData();
  }

  onEdit(event) {
    this.router.navigate(['/clients/update-client/' + event.data.clientId]);
  }

  initData() {
    let params = new HttpParams();
    if (this.optionsClient.searchQuery != null) {
      params = params.append('SearchQuery', this.optionsClient.searchQuery);
    }
    if (this.optionsClient.serie != null) {
      params = params.append('Serie', this.optionsClient.serie);
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
            this.optionsClient.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsClient.totalCount = this.optionsClient.totalCount['totalCount'];
          } else {
            this.optionsClient.source.load(result.body);
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
      if (this.optionsClient.searchQuery != null) {
        params = params.append('SearchQuery', this.optionsClient.searchQuery);
      }
      if (this.optionsClient.serie != null) {
        params = params.append('Serie', this.optionsClient.serie);
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
  
  searchFilter(searchQuery: string) {
    if (typeof searchQuery === 'string') {
      this.optionsClient.serie = null;
      this.optionsClient.searchQuery = searchQuery;
      // aqui deberia primero buscar en la tabla, si no lo encuentra en la tabla, llamar a la base de datos
      this.initData();
    }
  }

  searchFilterNumber(searchNumber: number) {

    if (typeof searchNumber === 'string') {
      this.optionsClient.searchQuery = null;
      this.optionsClient.serie = searchNumber;
      // aqui deberia primero buscar en la tabla, si no lo encuentra en la tabla, llamar a la base de datos

      this.initData();
    }
  }


}
