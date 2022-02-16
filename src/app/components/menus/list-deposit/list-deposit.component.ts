import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { SentActionPatchDeposit } from 'src/app/shared/multi-sel/multi-sel.component';
import { environment } from 'src/environments/environment';
import { CreditMovementDto } from '../models/credit-movement-dto';
import { OptionsCreditMovement } from '../models/options-credit-movement';
import { CreditMovementsService } from '../services/credit-movements.service';


@Component({
  selector: 'app-list-deposit',
  templateUrl: './list-deposit.component.html',
  styleUrls: ['./list-deposit.component.scss'],
})
export class ListDepositComponent implements OnInit {
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  // public optionsCreditMovement: OptionsCreditMovement = new OptionsCreditMovement();
  // public columnSelect: string = "YES";
  // public showTableCreditMovementImported: boolean = true;
  // public closeResult: string;

  // public modalUp = {
  //   status: '',
  //   actionModal: '',
  //   title: '',
  //   titleButton: '',
  // };
  // //entity: DepositUpdateDto;

  // constructor(
  //   private modalService: NgbModal,
  //   private service: CreditMovementsService,
  //   private router: Router,
  //   activatedRouter: ActivatedRoute
  // ) {
  //   activatedRouter.params.subscribe((params) => {
  //     if (params.clientId !== undefined) {
  //       console.log(params.clientId);
  //       // this.optionsCreditMovement.clientId = params.clientId;
  //     }
  //     this.optionsCreditMovement.pageSize = 45;
  //     this.optionsCreditMovement.showPerPage = 15;

  //     this.optionsCreditMovement.auxMediaTypeAccept = environment.mediaTypes.creditMovement.get.accept.getAllJson;
  //     this.optionsCreditMovement.orderBy = "DepositDate desc";
  //     // this.optionsDebitReason.active = true;
  //     // this.optionsDebitReason.fields = 'type,active';

  //     this.allCreditMovements();
  //   });
  // }

  // private allCreditMovements() {
  //   let params = new HttpParams();
  //   if (this.optionsCreditMovement.searchQuery != null) {
  //     params = params.append('SearchQuery', this.optionsCreditMovement.searchQuery);
  //   }

  //   if (this.optionsCreditMovement.depositDate != null) {
  //     params = params.append('DepositDate', this.optionsCreditMovement.depositDate.toString());
  //   }

  //   if (this.optionsCreditMovement.document != null) {
  //     params = params.append('Document', this.optionsCreditMovement.document);
  //   }

  //   if (this.optionsCreditMovement.value != null) {
  //     params = params.append('Value', this.optionsCreditMovement.value);
  //   }

  //   if (this.optionsCreditMovement.creditReasonId != null) {
  //     params = params.append('CreditReasonId', this.optionsCreditMovement.creditReasonId);
  //   }
  //   if (this.optionsCreditMovement.bankAccountId != null) {
  //     params = params.append('BankAccountId', this.optionsCreditMovement.bankAccountId);
  //   }

  //   if (this.optionsCreditMovement.creditMovementStatusId != null) {
  //     params = params.append('CreditMovementStatusId', this.optionsCreditMovement.creditMovementStatusId);
  //   }

  //   // if (this.optionsCreditMovement.creditMovementsImportedId != null) {
  //   //   params = params.append('CreditMovementsImportedId', this.optionsCreditMovement.creditMovementsImportedId);
  //   // }

  //   // if (this.optionsCreditMovement.clientId != null) {
  //   //   params = params.append('ClientId', this.optionsCreditMovement.clientId);
  //   // }

  //   if (this.optionsCreditMovement.active != null) {
  //     params = params.append('Active', this.optionsCreditMovement.active);
  //   }
  //   if (this.optionsCreditMovement.orderBy != null) {
  //     params = params.append('OrderBy', this.optionsCreditMovement.orderBy);
  //   }
  //   if (this.optionsCreditMovement.fields != null) {
  //     params = params.append('Fields', this.optionsCreditMovement.fields);
  //   }
  //   params = params.append('PageNumber', this.optionsCreditMovement.currentPage.toString());
  //   params = params.append('PageSize', this.optionsCreditMovement.pageSize.toString());
  //   this.service
  //     .getAllCreditMovements(params, this.optionsCreditMovement.auxMediaTypeAccept)
  //     .subscribe((result: HttpResponse<any>) => {
  //       if (!result) {
  //         return;
  //       }
  //       if (result.status == 200) {
  //         if (this.optionsCreditMovement.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
  //           this.optionsCreditMovement.source.load(result.body.value);
  //           this.optionsCreditMovement.totalCount = JSON.parse(result.headers.get('X-Pagination'));
  //           this.optionsCreditMovement.totalCount = this.optionsCreditMovement.totalCount['totalCount'];
  //         } else {
  //           this.optionsCreditMovement.source.load(result.body);
  //           console.log(JSON.parse(result.headers.get('X-Pagination')))
  //           this.optionsCreditMovement.totalCount = JSON.parse(result.headers.get('X-Pagination'));
  //           this.optionsCreditMovement.totalCount = this.optionsCreditMovement.totalCount['totalCount'];
  //         }
  //       }
  //     }, (err: HttpErrorResponse) => {
  //       console.warn(err);
  //     });
  // }


  // initOnChagedData() {
  //   this.optionsCreditMovement.source.onChanged().subscribe((change) => {
  //     if (change.action === 'page') {
  //       this.nextPage(change.paging.page);
  //     }
  //   });
  // }

  // private nextPage(pageIndex) {
  //   var getNew = pageIndex * this.optionsCreditMovement.showPerPage;
  //   if (getNew >= this.optionsCreditMovement.source.count() && getNew < this.optionsCreditMovement.totalCount) {
  //     this.optionsCreditMovement.currentPage = this.optionsCreditMovement.currentPage + 1;

  //     let params = new HttpParams();
  //     if (this.optionsCreditMovement.searchQuery != null) {
  //       params = params.append('SearchQuery', this.optionsCreditMovement.searchQuery);
  //     }

  //     if (this.optionsCreditMovement.depositDate != null) {
  //       params = params.append('DepositDate', this.optionsCreditMovement.depositDate.toString());
  //     }

  //     if (this.optionsCreditMovement.document != null) {
  //       params = params.append('Document', this.optionsCreditMovement.document);
  //     }

  //     if (this.optionsCreditMovement.value != null) {
  //       params = params.append('Value', this.optionsCreditMovement.value);
  //     }

  //     if (this.optionsCreditMovement.creditReasonId != null) {
  //       params = params.append('CreditReasonId', this.optionsCreditMovement.creditReasonId);
  //     }

  //     if (this.optionsCreditMovement.creditMovementStatusId != null) {
  //       params = params.append('CreditMovementStatusId', this.optionsCreditMovement.creditMovementStatusId);
  //     }

  //     // if (this.optionsCreditMovement.creditMovementsImportedId != null) {
  //     //   params = params.append('CreditMovementsImportedId', this.optionsCreditMovement.creditMovementsImportedId);
  //     // }

  //     // if (this.optionsCreditMovement.clientId != null) {
  //     //   params = params.append('ClientId', this.optionsCreditMovement.clientId);
  //     // }

  //     if (this.optionsCreditMovement.active != null) {
  //       params = params.append('Active', this.optionsCreditMovement.active);
  //     }
  //     if (this.optionsCreditMovement.orderBy != null) {
  //       params = params.append('OrderBy', this.optionsCreditMovement.orderBy);
  //     }
  //     if (this.optionsCreditMovement.fields != null) {
  //       params = params.append('Fields', this.optionsCreditMovement.fields);
  //     }
  //     params = params.append('PageNumber', this.optionsCreditMovement.currentPage.toString());
  //     params = params.append('PageSize', this.optionsCreditMovement.pageSize.toString());
  //     this.service
  //       .getAllCreditMovements(params, this.optionsCreditMovement.auxMediaTypeAccept)
  //       .subscribe((result: HttpResponse<any>) => {
  //         if (!result) {
  //           return;
  //         }
  //         if (result.status == 200) {
  //           if (this.optionsCreditMovement.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
  //             result.body.value.forEach((element) => {
  //               this.optionsCreditMovement.source.add(element);
  //             });
  //           } else {
  //             result.body.forEach((element) => {
  //               this.optionsCreditMovement.source.add(element);
  //             });
  //           }
  //         }
  //       }, (err: HttpErrorResponse) => {
  //         console.warn(err);
  //       });
  //   }
  // }


  // onEdit(entity: CreditMovementDto, content) {
  //   if (entity.active) {
  //     if (
  //       entity.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.porVerificar) {
  //       // this.router.navigate([
  //       //   '/deposits/update-deposit/' + entity.creditMovementsId + '/' + entity.client.clientId,
  //       // ]);
  //     } else {
  //       this.modalUp.actionModal = 'MODIFY';
  //       this.modalUp.status = 'already verified';
  //       this.modalUp.title = 'Not possible';
  //       this.modalUp.titleButton = '';
  //       this.modalService
  //         .open(content, { ariaLabelledBy: 'modal-basic-title' })
  //         .result.then(
  //           (result) => {
  //             this.closeResult = `Closed with: ${result}`;
  //           },
  //           (reason) => {
  //             this.closeResult = `Dismissed ${this.getDismissReason(
  //               reason,
  //               null,
  //               null
  //             )}`;
  //           }
  //         );
  //     }
  //   } else {
  //     this.modalUp.actionModal = 'MODIFY';
  //     this.modalUp.status = 'Deleted.!';
  //     this.modalUp.title = 'Not possible';
  //     this.modalUp.titleButton = '';
  //     this.modalService
  //       .open(content, { ariaLabelledBy: 'modal-basic-title' })
  //       .result.then(
  //         (result) => {
  //           this.closeResult = `Closed with: ${result}`;
  //         },
  //         (reason) => {
  //           this.closeResult = `Dismissed ${this.getDismissReason(
  //             reason,
  //             null,
  //             null
  //           )}`;
  //         }
  //       );
  //   }

  // }

  // private getDismissReason(
  //   reason: any,
  //   entity: CreditMovementDto,
  //   button: string
  // ): string {
  //   // console.log(reason);
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else if (reason == 'accept' && button == 'DELETE') {
  //     this.deleteOrRestoreDeposit(entity);
  //   } else if (reason == 'accept' && button == 'VERIFI') {

  //     this.verifiedDeposit(entity, this.creditMovementsImported);
  //   } else if (reason == 'accept' && button == 'RESTORE') {
  //     this.deleteOrRestoreDeposit(entity);
  //   } else if (reason == 'accept' && button == 'NOT FOUND') {
  //     this.notFoundDeposit(entity);
  //   } else if (reason == 'accept' && button == 'TO BE VERIFIED') {
  //     this.unverifiedDeposit(entity);
  //   } else {
  //     this.showMsgNoMatchValues = false;
  //     this.showTableCreditMovementImported = true;
  //     this.showCreditMovementImport = false;
  //     return `with: ${reason}`;

  //   }
  // }

  // onDelete(entity: CreditMovementDto, content) {
  //   this.modalUp.actionModal = 'DELETE';
  //   if (entity.active) {
  //     if (this.canDelete(entity)) {
  //       this.modalUp.titleButton = 'DELETE';
  //       this.modalUp.title = 'WARNING';
  //     } else {
  //       this.modalUp.status = 'already verified';
  //       this.modalUp.title = 'Not possible';
  //       this.modalUp.titleButton = '';
  //     }
  //   } else {
  //     this.modalUp.status = 'been removed before.!';
  //     this.modalUp.title = 'Not possible';
  //     this.modalUp.titleButton = '';
  //   }


  //   this.modalService
  //     .open(content, { ariaLabelledBy: 'modal-basic-title' })
  //     .result.then(
  //       (result) => {
  //         this.closeResult = `Closed with: ${result}`;
  //       },
  //       (reason) => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(
  //           reason,
  //           entity,
  //           this.modalUp.actionModal
  //         )}`;
  //       }
  //     );
  // }

  // public creditMovementToVerifi: CreditMovementDto;
  // onVerified(item: SentActionPatchDeposit, content) {
  //   // console.log(item)
  //   if (item.option == 'VERIFIED') {
  //     console.log(" Se puede verificar ?");
  //     if (this.canVerifiOrNotFund(item.entity)) {
  //       console.log(" Si se puede verificar.!");

  //       var ids: string[] = [];
  //       ids.push(item.entity.creditMovementsId);
  //       console.log(" Se puede verificar automaticamente?");

  //       this.cantVerifiAuto(ids).subscribe((resp: boolean) => {
  //         if (resp == false) {
  //           console.log(" No se puede verificar automaticamente, abriremos el menú manual");

  //           this.creditMovementToVerifi = item.entity;
  //           // console.log(this.creditMovementToVerifi.bankAccount.bankAccountId);
  //           this.modalUp.status = '';
  //           this.modalUp.actionModal = 'VERIFI';
  //           this.modalUp.title = 'VERIFI';
  //           this.modalUp.titleButton = 'VERIFI';
  //         } else {
  //           console.log(" Si se pudo verificar automaticamente");

  //           this.modalUp.status = 'Verified Automatically';
  //           this.modalUp.title = 'VERIFIED OK.!';
  //           this.modalUp.titleButton = '';
  //         }
  //       });
  //     } else {
  //       this.modalUp.status = '';
  //       this.modalUp.title = 'Not possible';
  //       this.modalUp.titleButton = '';
  //     }

  //   } else if (item.option == 'UNVERIFIED') {
  //     if (this.canUnverified(item.entity)) {
  //       this.modalUp.status = '';
  //       this.modalUp.actionModal = 'TO BE VERIFIED';
  //       this.modalUp.title = 'TO BE VERIFIED';
  //       this.modalUp.titleButton = 'TO BE VERIFIED';
  //     } else {
  //       this.modalUp.status = '';
  //       this.modalUp.title = 'Not possible';
  //       this.modalUp.titleButton = '';
  //     }

  //   } else if (item.option == 'NOT FOUND') {
  //     if (this.canVerifiOrNotFund(item.entity)) {
  //       this.modalUp.status = '';
  //       this.modalUp.actionModal = 'NOT FOUND';
  //       this.modalUp.title = 'NOT FOUND';
  //       this.modalUp.titleButton = 'NOT FOUND';
  //     } else {
  //       this.modalUp.status = '';
  //       this.modalUp.title = 'Not possible';
  //       this.modalUp.titleButton = '';
  //     }

  //   } else if (item.option == 'UNVERIFIED (NF)') {
  //     if (this.canUnverifiedNF(item.entity)) {
  //       this.modalUp.status = '';
  //       this.modalUp.actionModal = 'TO BE VERIFIED';
  //       this.modalUp.title = 'TO BE VERIFIED';
  //       this.modalUp.titleButton = 'TO BE VERIFIED';
  //     } else {
  //       this.modalUp.status = '';
  //       this.modalUp.title = 'Not possible';
  //       this.modalUp.titleButton = '';
  //     }

  //   }
  //   else if (item.option == 'RESTORE') {
  //     if (this.canRestore(item.entity)) {
  //       this.modalUp.status = '';
  //       this.modalUp.actionModal = 'RESTORE';
  //       this.modalUp.title = 'RESTORE';
  //       this.modalUp.titleButton = 'RESTORE';
  //     } else {
  //       this.modalUp.status = '';
  //       this.modalUp.title = 'Not possible';
  //       this.modalUp.titleButton = '';
  //     }
  //   }


  //   this.modalService
  //     .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  //     .result.then(
  //       (result) => {
  //         this.closeResult = `Closed with: ${result}`;
  //       },
  //       (reason) => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(
  //           reason,
  //           item.entity,
  //           this.modalUp.actionModal
  //         )}`;
  //       }
  //     );
  // }




  // // private canVerifiOrNotFund(entity: CreditMovementDto): boolean {
  // //   if (entity.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.porVerificar) {
  // //     return true;
  // //   }
  // //   return false;
  // // }

  // // private canUnverified(entity: CreditMovementDto): boolean {
  // //   // console.log(entity);
  // //   if (entity.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.encontrado) {
  // //     return true
  // //   }
  // //   return false;
  // // }
  // // private canUnverifiedNF(entity: CreditMovementDto): boolean {
  // //   // console.log(entity);
  // //   if (entity.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.noEncontrado) {
  // //     return true
  // //   }
  // //   return false;
  // // }
  // // private canRestore(entity: CreditMovementDto): boolean {
  // //   if (entity.active == false && entity.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.porVerificar) {
  // //     return true;
  // //   }
  // //   return false;
  // // }

  // // private canDelete(entity: CreditMovementDto): boolean {
  // //   if (entity.active == true && entity.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.porVerificar) {
  // //     return true;
  // //   }
  // //   return false;
  // // }

  // // ngOnInit() {
  // //   this.initOnChagedData();
  // // }

  // // private deleteOrRestoreDeposit(entity: CreditMovementDto) {
  // //   var act: string = null;
  // //   if (entity.active == true) {
  // //     act = 'delete';
  // //   } else {
  // //     act = 'restore';
  // //   }
  // //   var vendor: string = act + " by: " + localStorage.getItem('nombre_sing_in');

  // //   let params = new HttpParams();
  // //   params = params.append('act', act);
  // //   params = params.append('vendor', vendor);

  // //   this.service.putDeleteOrRestoreCreditMovement(entity.bankAccount.bankAccountId
  // //     , entity.creditMovementsId
  // //     , params
  // //     , environment.mediaTypes.creditMovement.putDelete.ContentType.putJson)
  // //     .subscribe((result: HttpResponse<any>) => {
  // //       if (result.status == 200) {
  // //         this.localDataSourceEditRow(entity, vendor, act.toUpperCase());
  // //       }
  // //     }, (err: HttpErrorResponse) => {
  // //       console.warn(err);
  // //       // event.confirm.reject();
  // //     });

  // // }

  // // private verifiedDeposit(entity: CreditMovementDto, creditMovementsImported: any) {
  // //   var vendor: string = "Verify by: " + localStorage.getItem('nombre_sing_in');
  // //   var toPatch = [];
  // //   entity.creditMovementStatus.creditMovementStatusId = environment.tuplas.creditMovementStatus.encontrado;
  // //   entity.creditMovementsImported = creditMovementsImported;

  // //   if (entity.value == entity.creditMovementsImported.value) {
  // //     toPatch.push({
  // //       path: '/verifiedType',
  // //       op: 'replace',
  // //       value: vendor,
  // //     })
  // //     toPatch.push(
  // //       {
  // //         path: '/creditMovementsImportedId',
  // //         op: 'replace',
  // //         value: entity.creditMovementsImported.creditMovementsImportedId,
  // //       }
  // //     )
  // //     toPatch.push(
  // //       {
  // //         path: '/creditMovementStatusId',
  // //         op: 'replace',
  // //         value: entity.creditMovementStatus.creditMovementStatusId,
  // //       }
  // //     )

  // //     this.service.patchCreditMovement(
  // //       entity.bankAccount.bankAccountId,
  // //       entity.creditMovementsId,
  // //       toPatch,
  // //       environment.mediaTypes.creditMovement.patch.ContentType.patchJson)
  // //       .subscribe((result: HttpResponse<any>) => {
  // //         console.log(result)
  // //         if (result.status == 201) {
  // //           console.log("entro aqi")
  // //           this.localDataSourceEditRow(entity, vendor, "VERIFI");
  // //           this.creditMovementsImported = null;
  // //           this.showMsgNoMatchValues = false;
  // //           this.showTableCreditMovementImported = true;
  // //           this.showCreditMovementImport = false;
  // //         }
  // //       }, (err: HttpErrorResponse) => {
  // //         console.warn(err);
  // //         this.creditMovementsImported = null
  // //       });
  // //   } else {
  // //     console.log("Los valores entre las 2 transacciones no coinciden");
  // //   }

  // // }

  // // private unverifiedDeposit(entity: CreditMovementDto) {
  // //   var vendor: string = "Unverified by: " + localStorage.getItem('nombre_sing_in');
  // //   var toPatch = [];
  // //   entity.creditMovementStatus.creditMovementStatusId = environment.tuplas.creditMovementStatus.porVerificar;
  // //   // entity.creditMovementsImported = null;
  // //   toPatch.push({
  // //     path: '/verifiedType',
  // //     op: 'replace',
  // //     value: vendor,
  // //   })
  // //   toPatch.push(
  // //     {
  // //       path: '/creditMovementsImportedId',
  // //       op: 'replace',
  // //       value: null,
  // //     }
  // //   )
  // //   toPatch.push(
  // //     {
  // //       path: '/creditMovementStatusId',
  // //       op: 'replace',
  // //       value: entity.creditMovementStatus.creditMovementStatusId,
  // //     }
  // //   )

  // //   this.service.patchCreditMovement(
  // //     entity.bankAccount.bankAccountId,
  // //     entity.creditMovementsId,
  // //     toPatch,
  // //     environment.mediaTypes.creditMovement.patch.ContentType.patchJson)
  // //     .subscribe((result: HttpResponse<any>) => {
  // //       console.log(result)
  // //       if (result.status == 201) {
  // //         console.log("entro aqi")
  // //         this.localDataSourceEditRow(entity, vendor, "TO BE VERIFIED");
  // //       }
  // //     }, (err: HttpErrorResponse) => {
  // //       console.warn(err);
  // //     });


  // // }

  // // private notFoundDeposit(entity: CreditMovementDto) {
  // //   var vendor: string = "Not found by: " + localStorage.getItem('nombre_sing_in');
  // //   var toPatch = [];
  // //   entity.creditMovementStatus.creditMovementStatusId = environment.tuplas.creditMovementStatus.noEncontrado;
  // //   toPatch.push({
  // //     path: '/verifiedType',
  // //     op: 'replace',
  // //     value: vendor,
  // //   })

  // //   toPatch.push(
  // //     {
  // //       path: '/creditMovementStatusId',
  // //       op: 'replace',
  // //       value: entity.creditMovementStatus.creditMovementStatusId,
  // //     }
  // //   )

  // //   this.service.patchCreditMovement(
  // //     entity.bankAccount.bankAccountId,
  // //     entity.creditMovementsId,
  // //     toPatch,
  // //     environment.mediaTypes.creditMovement.patch.ContentType.patchJson)
  // //     .subscribe((result: HttpResponse<any>) => {
  // //       console.log(result)
  // //       if (result.status == 201) {
  // //         console.log("entro aqi")
  // //         this.localDataSourceEditRow(entity, vendor, "NOT FOUND");
  // //       }
  // //     }, (err: HttpErrorResponse) => {
  // //       console.warn(err);
  // //     });


  // // }

  // // localDataSourceEditRow(entity: CreditMovementDto, vendor: string, action: string) {

  // //   this.optionsCreditMovement.source.getAll().then((x: []) => {
  // //     var aux: CreditMovementDto = x.find((element: CreditMovementDto) => element.creditMovementsId == entity.creditMovementsId);
  // //     if (action == "DELETE") {
  // //       aux.active = false;
  // //       aux.verifiedType = vendor;
  // //       this.optionsCreditMovement.source.load(x);
  // //     }
  // //     if (action == "RESTORE") {
  // //       aux.active = true;
  // //       aux.verifiedType = vendor;
  // //       this.optionsCreditMovement.source.load(x);
  // //     }
  // //     if (action == "VERIFI") {
  // //       aux.creditMovementsImported.creditMovementsImportedId = entity.creditMovementsImported.creditMovementsImportedId;
  // //       aux.creditMovementStatus.creditMovementStatusId = entity.creditMovementStatus.creditMovementStatusId;
  // //       aux.verifiedType = vendor;
  // //       this.optionsCreditMovement.source.load(x);
  // //     }
  // //     if (action == "NOT FOUND") {
  // //       aux.creditMovementStatus.creditMovementStatusId = entity.creditMovementStatus.creditMovementStatusId;
  // //       aux.verifiedType = vendor;
  // //       this.optionsCreditMovement.source.load(x);
  // //     }

  // //     if (action == "TO BE VERIFIED") {
  // //       aux.creditMovementsImported = entity.creditMovementsImported;
  // //       aux.creditMovementStatus.creditMovementStatusId = entity.creditMovementStatus.creditMovementStatusId;
  // //       aux.verifiedType = vendor;
  // //       this.optionsCreditMovement.source.load(x);
  // //     }

  // //   });

  // // }

  // // cantVerifiAuto(creditMovementIds: string[]): Observable<boolean> {
  // //   var subject = new Subject<boolean>();

  // //   if (creditMovementIds.length > 0) {
  // //     this.service
  // //       .verifiAutomaticallyCreditMovements(creditMovementIds, environment.mediaTypes.creditMovement.postVerified.ContentType.postJson)
  // //       .subscribe((result: HttpResponse<any>) => {
  // //         console.log(JSON.parse(result.body.msg));
  // //         var aux = JSON.parse(result.body.msg);
  // //         console.log(JSON.parse(aux.verified));

  // //         if (aux.verified > 0) {
  // //           subject.next(true)
  // //           this.allCreditMovements();
  // //         } else {
  // //           console.log("Etnro aqi")
  // //           subject.next(false)
  // //         }
  // //       });
  // //   }
  // //   return subject.asObservable();
  // // }

  // // searchFilters(optionsCreditMovement: OptionsCreditMovement){
  // //   // console.log(optionsCreditMovement);
  // //   this.allCreditMovements();
    
  // }
}


