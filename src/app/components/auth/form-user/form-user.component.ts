import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCreateDto } from 'src/app/shared/models/user-create-dto';
import { UserDto } from 'src/app/shared/models/user-dto';
import { ValidatorsFormsService } from 'src/app/shared/service/validators-forms.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  public accountForm: FormGroup;

  @Input()
  modelo: UserDto;
  @Input()
  renderValue: 'Crear Usuario';
  
  constructor(
    private formBuilder: FormBuilder,
    public validatorService: ValidatorsFormsService
  ) { }

  ngOnInit(): void {
    this.createAccountForm();
    if (this.modelo !== undefined) {
      this.accountForm.patchValue(this.modelo);
     
    }
  }

  @Output()
  submit: EventEmitter<UserDto> = new EventEmitter<UserDto>();


  save() {
    if (this.accountForm.valid) {
      if(this.accountForm.controls.password.value == this.accountForm.controls.confirmPwd.value){
        var aux: UserCreateDto = this.accountForm.value;

          this.submit.emit(aux);
        
      }else{
        alert("Las contraseñas no coinciden");
      }
     
    }else{
      this.accountForm.markAllAsTouched();
      console.log('FORM NOT VALID');
      return;
    }
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      userName: ['',
      {
        validators: [Validators.required],
      },],
      password: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      confirmPwd: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });
  }

}
