import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClientCreateDto } from 'src/app/components/users/models/client-create-dto';
import { ClientDto } from 'src/app/components/users/models/client-dto';
import { ClientService } from 'src/app/components/users/services/client.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent implements OnInit {
  renderValue = 'Client Add';

  @Input()
  callType: string;

  @Output()
  clientResponse: EventEmitter<ClientDto> = new EventEmitter<ClientDto>();
  
  constructor(private router: Router, private service: ClientService) {}

  save(client: ClientCreateDto) {
    if (client.firstName) {
      client.clientId = uuidv4();
      if(!client.password){
        client.password = uuidv4()+'@none.com'
      }

      this.service
      .addClient(client, environment.mediaTypes.client.post.ContentType.postJson)
      .subscribe((result: HttpResponse<any>) => {
        console.log(result);
        if (result.status == 201) {
          if(this.callType === 'modal'){
            console.log(result.body);
            this.clientResponse.emit(result.body);
          }else{
            this.router.navigate(['/clients/list-client']);
          }       
         }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
     }
  }

  ngOnInit() {}
}
