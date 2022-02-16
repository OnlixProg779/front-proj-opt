import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCreateDto } from 'src/app/shared/models/user-create-dto';
import { SecurityService } from 'src/app/shared/service/security.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(
    private router: Router, 
    private service: SecurityService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
  }


  save(user: UserCreateDto) {
    if (user.userName) {

      this.service
      .addUser(user, 'application/json')
      .subscribe((result: HttpResponse<any>) => {
        console.log(result);
        if (result.status == 200) {
       
          this.modalService.dismissAll();
            this.router.navigate(['/dashboard/default']);
            
         }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
     }
  }

}
