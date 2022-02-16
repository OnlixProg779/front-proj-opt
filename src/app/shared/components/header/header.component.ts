import { HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ClientDto } from 'src/app/components/users/models/client-dto';
import { ClientService } from 'src/app/components/users/services/client.service';
import { NavService } from '../../service/nav.service';
import { SecurityService } from '../../service/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile: boolean;

  public filterSearchForm: FormGroup;
  searchQuery: string;
  filterThrottle = new Subject<string>();
  accept: string = 'application/json';
  listClients: ClientDto[];
  
  userName: string = localStorage.getItem('username');


  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService, private service: SecurityService, private formBuilder: FormBuilder, private serviceClient: ClientService) {
    this.createFilterSearchForm();

  }
  createFilterSearchForm() {
    this.filterSearchForm = this.formBuilder.group({
      searchQuery: ['']
    })
  }


  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }


  ngOnInit() {
    this.filterThrottle.pipe(debounceTime(1000)).subscribe((input) => {
      //  this.submit.emit(null);
      this.searchQuery = input;
      this.searchFilter(input);
    });



  }

  searchFilter(action: string) {
    // if(action == 'button'){
    //   this.searchQuery = this.filterSearchForm.controls['searchQuery'].value
    //   this.submit.emit(this.searchQuery);
    //     }else{
    //       this.submit.emit(action);
    // }  

    let params = new HttpParams();
    if (this.searchQuery) {
      params = params.append('SearchQuery', this.searchQuery);


      // params = params.append('PageNumber',this.currentPage.toString());
      // params = params.append('PageSize',this.pageSize.toString());
      // this.serviceClient.getClients(params, this.accept)
      //   .subscribe((result: HttpResponse<any>) => {
      //     if (!result) {
      //       return;
      //     }
      //     if (result.status == 200) {
      //       this.listClients = result.body;
      //       // this.totalCount = JSON.parse(result.headers.get("X-Pagination"));
      //       // this.totalCount = this.totalCount["totalCount"];
      //     }
      //   }
      //   )
    }

  }

  logout() {
    this.service.logout();
  }










}
