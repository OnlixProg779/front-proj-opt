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
    renderAction: 'Add new deposit',
  };

  constructor(
    private router: Router,
    private service: CreditMovementsService,
  ) {
   
  }

  save(depositCreateDto: CreditMovementForCreateDto) {
    if (depositCreateDto.bankAccountId) {

      console.log(depositCreateDto);
      this.service
      .addCreditMovement(depositCreateDto.bankAccountId, depositCreateDto, environment.mediaTypes.creditMovement.post.ContentType.postJson)
      .subscribe(() => {
        this.router.navigate(['/dashboard/default']);
      });
    } else {
    }
  }

  ngOnInit(): void {}
}
