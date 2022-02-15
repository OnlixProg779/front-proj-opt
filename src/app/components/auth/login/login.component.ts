import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SecurityService } from 'src/app/shared/service/security.service';
import { ValidatorsFormsService } from 'src/app/shared/service/validators-forms.service';
import { AppUser } from '../models/app-user';
import { AppUserAuth } from '../models/app-user-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  securityObject: AppUserAuth = new AppUserAuth();
  returnUrl = '/dashboard/default';
  errorMessage = '';

  public closeResult: string;
  public modalUp = {
    status: 'Invalid username or Password',
    actionModal: 'LOGIN FAILED',
    title: 'INVALID',
    titleButton: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private service: SecurityService,
    private router: Router,
    private modalService: NgbModal,
    public validatorService: ValidatorsFormsService
  ) {

  }

  owlcarousel = [
    {
      title: 'Welcome to Envios Ecuador',
      desc: 'Fácil, Rápido y Seguro...',
    },
    {
      title: 'Welcome to Envios Ecuador',
      desc: 'This website is for administrators only',
    },
    {
      title: 'Welcome to Envios Ecuador',
      desc: 'Panel Admin and more',
    },
  ];
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true,
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', {
        validators:[Validators.required]
      }],
      password: ['', {
        validators:[Validators.required]
      }],
    });
  }

  ngOnInit() {
    this.createLoginForm();
  }

  onSubmit() {}

  login(userModel: AppUser, content) {
    userModel = this.loginForm.value;
    // console.log(userModel);
    this.errorMessage = '';
    this.service.login(userModel).subscribe(
      (resp) => {
        this.securityObject = resp;
        this.router.navigateByUrl(this.returnUrl);
      },
      (error) => {
      
        this.errorMessage = error;
        this.modalUp.status = this.errorMessage;
            this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(
              reason
            )}`;
          }
        );
      }
    );
  }

  private getDismissReason(
    reason: any
  ): string {
    console.log(reason);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }else {
      return `with: ${reason}`;
    }
  }
  
}
