import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientCreateDto } from 'src/app/components/users/models/client-create-dto';
import { ValidatorsFormsService } from 'src/app/shared/service/validators-forms.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss'],
})
export class FormClientComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;

  //Type
  object = Object;
  mode: string;
  options2 = [
    { new: 'New' },
    { regular: 'Regular' },
    { frequent: 'Frequent' },
    { vip: 'VIP' },
  ];

  @Input()
  optionCheked = 'New';

  // GENDER
  modeGender: string;
  optionsGender = [{ m: 'M' }, { f: 'F' }, { x: 'X' }];

  @Input()
  optionChekedGender = 'X';

  @Input()
  renderValue: string;

  @Input()
  modelo: ClientCreateDto;

  @Output()
  submit: EventEmitter<ClientCreateDto> = new EventEmitter<ClientCreateDto>();

  clientSentCreateDto: ClientCreateDto;

  constructor(
    private formBuilder: FormBuilder,
    public validatorService: ValidatorsFormsService
  ) {}

  onItemChange(value) {
    this.mode = value;
    console.log(this.mode);
  }

  onItemChangeGender(value) {
    this.modeGender = value;
    console.log(this.modeGender);
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      clientId: [''],
      firstName: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      lastName: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      instagramName: [''],
      type: [''],
      dateOfBirth: [''],
      phone: [''],
      gender: [''],
      city: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      dni: [''],
      userName: [''],
      password: [
        ''
        // ,
        // {
        //   validators: [Validators.required],
        // },
      ], // Email en create, y orderId-Default en update
      passwordReal: [''],
      confirmPwd: [''],
      claimValueClient: ['true'],
    });
  }

  save() {
    if (this.accountForm.valid) {
      var aux: ClientCreateDto = this.accountForm.value;
      aux.type = this.mode;
      aux.gender = this.modeGender;
      if (JSON.stringify(this.clientSentCreateDto) !== JSON.stringify(aux)) {
        this.clientSentCreateDto = aux;
        this.submit.emit(this.clientSentCreateDto);
      }
    }else{
      this.accountForm.markAllAsTouched();
      console.log('FORM NOT VALID');
      return;
    }
  }

  ngOnInit() {
    this.createAccountForm();
    this.mode = this.options2[0].new;
    this.modeGender = this.optionsGender[2].x;

    // Para el uptade
    if (this.modelo !== undefined) {
      this.accountForm.patchValue(this.modelo);
      this.mode = this.optionCheked;
      this.modeGender = this.optionChekedGender;
      this.accountForm.controls['userName'].setValue(this.modelo.user.userName);
      this.accountForm.controls['passwordReal'].setValue(
        this.modelo.user.password
      );
      this.accountForm.controls['confirmPwd'].setValue(
        this.modelo.user.password
      );
      this.modelo.user.userClaims.forEach((claim) => {
        if (claim.claimType === 'CanAccessUserCl') {
          this.accountForm.controls['claimValueClient'].setValue(
            claim.claimValue
          );
        }
      });
    }
  }
}
