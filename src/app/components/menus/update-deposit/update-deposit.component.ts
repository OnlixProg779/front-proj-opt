import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreditMovementDto } from '../models/credit-movement-dto';
import { CreditMovementForUpdateDto } from '../models/credit-movement-for-update-dto';
import { DepositUpdateDto } from '../models/deposit-update-dto';
import { OptionsCreditMovement } from '../models/options-credit-movement';
import { CreditMovementsService } from '../services/credit-movements.service';

@Component({
  selector: 'app-update-deposit',
  templateUrl: './update-deposit.component.html',
  styleUrls: ['./update-deposit.component.scss'],
})
export class UpdateDepositComponent implements OnInit {

  public optionsCreditMovement: OptionsCreditMovement = new OptionsCreditMovement();


  renderValues = {
    renderValue: 'Deposit Update',
    clientId: '',
    renderAction: 'Update deposit',
  };

  modelo: CreditMovementDto;
  private creditMovementId: string = null;

  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router,
    private service: CreditMovementsService
  ) {
    activatedRoute.params.subscribe((params) => {
      this.renderValues.clientId = params.clientId;
      this.optionsCreditMovement.auxMediaTypeAccept = environment.mediaTypes.creditMovement.getUnique.accept.getJson;
      this.creditMovementId = params.creditMovementId;
      this.initDataCreditMovement();

    });
  }

  ngOnInit(): void { }

  private initDataCreditMovement() {
    let params = new HttpParams();

    if (this.optionsCreditMovement.fields != null) {
      params = params.append('Fields', this.optionsCreditMovement.fields);
    }
    this.service
      .getUniqueCreditMovements(this.creditMovementId, params, this.optionsCreditMovement.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          var deposit = null;
          if (this.optionsCreditMovement.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
            deposit = result.body.value;

          } else {
            deposit = result.body;
          }
          this.modelo = deposit;
          this.modelo.creditMovementsId = this.creditMovementId;

        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
        this.router.navigate['/deposits/list-deposit']
      });

  }

  save(deposit: CreditMovementForUpdateDto) {
    if (deposit.bankAccountId) {
      deposit.active = this.modelo.active;
      console.log(deposit);
      this.service
        .putCreditMovement(deposit.bankAccountId
          , this.creditMovementId
          , deposit
          , null
          , environment.mediaTypes.creditMovement.put.ContentType.putJson)
        .subscribe((result: HttpResponse<any>) => {
          console.log(result)
          if (result.status == 201) {
            this.router.navigate(['/dashboard/default']);
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
        });
    }

  }
}
