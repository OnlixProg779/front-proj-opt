import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreditMovementForCreateDto } from '../models/credit-movement-for-create-dto';
import { CreditMovementsService } from '../services/credit-movements.service';

@Component({
  selector: 'app-create-deposit',
  templateUrl: './create-deposit.component.html',
  styleUrls: ['./create-deposit.component.scss'],
})
export class CreateDepositComponent implements OnInit {
  renderValues = {
    renderValue: 'Deposit Add',
    clientId: '',
    renderAction: 'Add new deposit',
  };

  constructor(
    private router: Router,
    private service: CreditMovementsService,
    activatedRouter: ActivatedRoute
  ) {
    activatedRouter.params.subscribe((params) => {
      this.renderValues.clientId = params.clientId;
      console.log(this.renderValues.clientId);
    });
  }

  save(depositCreateDto: CreditMovementForCreateDto) {
    if (depositCreateDto.bankAccountId) {
      if (
        this.renderValues.clientId == '' ||
        this.renderValues.clientId == null ||
        this.renderValues.clientId == 'undefined'
      ) {
        this.renderValues.clientId = depositCreateDto.clientId;
      }
      console.log(depositCreateDto);
      this.service
      .addCreditMovement(depositCreateDto.bankAccountId, depositCreateDto, environment.mediaTypes.creditMovement.post.ContentType.postJson)
      .subscribe(() => {
        this.router.navigate(['/clients/bills/',this.renderValues.clientId]);
      });
    } else {
    }
  }

  ngOnInit(): void {}
}
