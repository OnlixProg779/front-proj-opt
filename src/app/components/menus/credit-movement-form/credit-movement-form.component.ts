import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsFormsService } from 'src/app/shared/service/validators-forms.service';
import { environment } from 'src/environments/environment';
import { BankAccountDto } from '../../setting/models/BankAccounts/bank-account-dto';
import { OptionsBankAccount } from '../../setting/models/BankAccounts/options-bank-account';
import { CreditReasonDto } from '../../setting/models/CreditReason/credit-reason-dto';
import { OptionsCreditReason } from '../../setting/models/CreditReason/options-credit-reason';
import { MenusService } from '../../setting/services/menus.service';
import { ClientDto } from '../../users/models/client-dto';
import { CreditMovementDto } from '../models/credit-movement-dto';
import { CreditMovementForCreateDto } from '../models/credit-movement-for-create-dto';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credit-movement-form',
  templateUrl: './credit-movement-form.component.html',
  styleUrls: ['./credit-movement-form.component.scss']
})
export class CreditMovementFormComponent implements OnInit {

  public depositForm: FormGroup;

  userId: string = localStorage.getItem('userId'); 
  username: string = localStorage.getItem('username'); 

  bankAccountId: string = null;
  object = Object;
  public closeResult: string;

  @Input()
  renderValues = {
    renderValue: '',
    renderAction: '',
    clientId: '',
    nameClient: '',
  };

  depositEmitCreate: CreditMovementForCreateDto;

  // public optionsBankAccounts: OptionsBankAccount = new OptionsBankAccount();
  public optionsCreditReason: OptionsCreditReason = new OptionsCreditReason();


  formOptionsBankAccounts = [];
  formOptionsCreditReason = [];

  // clientDto: ClientDto = null;

  @Input()
  modelo: CreditMovementDto;

  @Output()
  submit: EventEmitter<CreditMovementForCreateDto> = new EventEmitter<CreditMovementForCreateDto>();

  changeImage = false;

  constructor(
    private formBuilder: FormBuilder,
    public validatorService: ValidatorsFormsService,
    private menusServices: MenusService,
    activatedRouter: ActivatedRoute
  ) {
    activatedRouter.params.subscribe((params) => {
      this.bankAccountId = params.bankAccountId;
      console.log(this.bankAccountId);
    });
    this.optionsCreditReason.auxMediaTypeAccept = environment.mediaTypes.creditReason.get.accept.getAllJson;
    this.optionsCreditReason.active = true;
    this.optionsCreditReason.fields = 'CreditReasonId,Reason';
    this.initDataCreditReasons();

  }

  ngOnInit(): void {
    this.createDepositForm();
    this.depositForm.controls['creditReasonId'].setValue(environment.tuplas.creditReason.deposito);
    if (this.modelo !== undefined) {
      console.log(this.modelo);
      this.depositForm.patchValue(this.modelo);
      this.depositForm.controls['bankAccountId'].setValue(this.modelo.bankAccount.bankAccountId);
      try {
        this.depositForm.controls['creditReasonId'].setValue(this.modelo.creditReason.creditReasonId);
      } catch (error) {
        console.warn(error)
      }
      this.depositForm.controls['depositDate'].setValue(this.modelo.depositDate.toString().split('T')[0]);
      this.depositForm.controls['clientId'].setValue(this.renderValues.clientId);
      console.log(this.depositForm.controls['clientId'].value);

    } else {
      if (this.renderValues.clientId != 'undefined') {
        this.depositForm.controls['clientId'].setValue(this.renderValues.clientId);
        console.log(this.depositForm.controls['clientId'].value)
      }
    }


  }
   public fieldDocument: string = "# Document";


  createDepositForm() {
    this.depositForm = this.formBuilder.group({
      depositDate: ['',
        {
          validators: [Validators.required],
        }],// IMPLEMENTAR EN FORMULARIO
      document: ['',
        {
          validators: [Validators.required],
        }], // 
      value: ['',
        {
          validators: [Validators.required],
        },], // 
      bankAccountId: ['',
        {
          validators: [Validators.required],
        }],
      image: [''], // yes
      creditReasonId: ['',
        {
          validators: [Validators.required],
        }], // IMPLEMENTAR EN FORMULARIO
      creditMovementStatusId: [ // IMPLEMENTAR EN FORMULARIO
        '',
        {
          validators: [Validators.required],
        },
      ],
      comment: [''],
    });
  }

  save() {

    console.log(this.depositForm.controls['bankAccountId'].value)
    if (!this.changeImage) {
      this.depositForm.patchValue({ image: null });
    }

    this.depositForm.controls['creditMovementStatusId'].setValue('');
    this.depositForm.controls['creditMovementStatusId'].setValue(
      environment.tuplas.creditMovementStatus.porVerificar
    );
    this.depositForm.controls['bankAccountId'].setValue('');
    this.depositForm.controls['bankAccountId'].setValue(
      this.bankAccountId
    );

    if (this.depositForm.valid) {

      var aux: CreditMovementForCreateDto = this.depositForm.value;
      // if(aux.creditReasonId != environment.tuplas.creditReason.payId){
      //   aux.document = aux.document + " trans: "+uuidv4() +" by: "+ this.employeeName;
      // }
      if (JSON.stringify(this.depositEmitCreate) !== JSON.stringify(aux)) {
        this.depositEmitCreate = aux;
        // console.log(this.depositEmitCreate)
        this.submit.emit(this.depositEmitCreate);
      }

    } else {
      this.depositForm.markAllAsTouched();
      console.log('FORM NOT VALID');
      console.log(this.depositForm.value);

      return;
    }
  }



  archivoSeleccionado(file) {
    this.changeImage = true;
    this.depositForm.get('image').setValue(file);
  }




  initDataCreditReasons() {
    let params = new HttpParams();
    if (this.optionsCreditReason.active != null) {
      params = params.append('Active', this.optionsCreditReason.active);
    }
    if (this.optionsCreditReason.orderBy != null) {
      params = params.append('OrderBy', this.optionsCreditReason.orderBy);
    }
    if (this.optionsCreditReason.fields != null) {
      params = params.append('Fields', this.optionsCreditReason.fields);
    }
    params = params.append('PageNumber', 1);
    params = params.append('PageSize', 100);
    this.menusServices
      .getAllCreditReasons(params, this.optionsCreditReason.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          if (this.optionsCreditReason.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
            result.body.value.forEach((element: CreditReasonDto) => {

              this.formOptionsCreditReason.push({ value: element.creditReasonId, title: element.reason })

            });
            this.optionsCreditReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditReason.totalCount = this.optionsCreditReason.totalCount['totalCount'];
          } else {
            result.body.forEach((element: CreditReasonDto) => {

              this.formOptionsCreditReason.push({ value: element.creditReasonId, title: element.reason })

            });
            this.optionsCreditReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditReason.totalCount = this.optionsCreditReason.totalCount['totalCount'];
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }

}
