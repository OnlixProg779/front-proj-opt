import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCreateDto } from 'src/app/shared/models/user-create-dto';
import { AppUserClaims } from '../../auth/models/app-user-claims';
import { ClientCreateDto } from '../models/client-create-dto';
import { ClientService } from '../services/client.service';
import {v4 as uuidv4} from 'uuid';
import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { OptionsClient } from '../models/options-client';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss'],
})
export class UpdateClientComponent implements OnInit {
  renderValue = 'Client Update';
  optionCheked = '';
  optionChekedGender = '';
  public optionsClient: OptionsClient = new OptionsClient();

  modelo: ClientCreateDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: ClientService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let params2 = new HttpParams();
      var decoded:any = jwt_decode(sessionStorage.getItem('bearerToken'));
      // throw new Error('Method not implemented.');
  
      if (decoded.CanAccessManage == 'true') {
        this.optionsClient.auxMediaTypeAccept = environment.mediaTypes.client.get.accept.getAllclientToOwnerJson;
  
      }
      else {
        this.optionsClient.auxMediaTypeAccept = environment.mediaTypes.client.get.accept.getAllclientToEmployeeAJson;
  
      }
      this.service
      .getUniqueClient(params2, params.idClient, this.optionsClient.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          if (this.optionsClient.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
            this.modelo = result.body.value;
            this.modelo.clientId = params.idClient;
            this.optionCheked = this.modelo.type;
            this.optionChekedGender = this.modelo.gender;
           
          } else {
            this.modelo = result.body;
            this.modelo.clientId = params.idClient;
            this.optionCheked = this.modelo.type;
            this.optionChekedGender = this.modelo.gender;
          
          }

        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
        this.router.navigate['/clients/list-client']
      });

    });
  }

  save(client) {
    client.active = this.modelo.active;
    console.log(client);
    var clientUpdate: ClientCreateDto;
    if (client.confirmPwd == client.passwordReal) {
      clientUpdate = client;

      clientUpdate.user = new UserCreateDto();
      clientUpdate.user.userClaims.push(new AppUserClaims());

      clientUpdate.user.userName = client.userName;
      clientUpdate.user.password = client.passwordReal;

  
      clientUpdate.clientId = this.modelo.clientId;
      
      clientUpdate.userId = this.modelo.userId;
      clientUpdate.user.active = this.modelo.user.active;
      clientUpdate.user.userId = this.modelo.user.userId;

      clientUpdate.user.userClaims[0].claimType = 'CanAccessUserCl';
        clientUpdate.user.userClaims[0].claimValue = client.claimValueClient;

      if(this.modelo.user.userClaims.length > 0){
        clientUpdate.user.userClaims[0].claimId = this.modelo.user.userClaims[0].claimId ;
        clientUpdate.user.userClaims[0].userId = this.modelo.user.userClaims[0].userId;  
      }else{
        clientUpdate.user.userClaims[0].claimId = uuidv4();
        clientUpdate.user.userClaims[0].userId = this.modelo.userId; 
      }

      console.log(clientUpdate);
      this.service
      .updateClient(client, environment.mediaTypes.client.put.ContentType.putJson)
      .subscribe((result: HttpResponse<any>) => {
        console.log(result);
        if (result.status == 201) {
         console.log("Actualizado")  
         this.router.navigate(['/clients/list-client']);
         }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
    } else {

    }


  }
}
