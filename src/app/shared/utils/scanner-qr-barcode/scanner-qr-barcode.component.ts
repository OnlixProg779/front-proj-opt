import { Component, OnInit, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-scanner-qr-barcode',
  templateUrl: './scanner-qr-barcode.component.html',
  styleUrls: ['./scanner-qr-barcode.component.scss']
})
export class ScannerQrBarcodeComponent implements OnInit {

  public scannerEnabled: boolean = false;
  public transports: Transport[] = [];
  public closeResult: string;
  @ViewChild('content', {static: false}) contenidoDelModal;

  @Output()
  codeCharged: EventEmitter<Appointment> = new EventEmitter<Appointment>();


  constructor(
    private modalService: NgbModal,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
  }

  public scanSuccessHandler($event: any, modal: any) {
    this.scannerEnabled = false;
    try {
      const appointment = new Appointment($event,'Code Charged');
      this.codeCharged.emit(appointment);
      modal.dismiss('Code Charged')
    } catch (error) {
      console.error("Ha ocurrido un error por favor intentalo nuevamente ... ");
      console.error(error);
      this.codeCharged.emit(null);
      this.cd.markForCheck();
    }
  }

  public enableScanner(content) {
    this.scannerEnabled = true;
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

  private getDismissReason(
    reason: any
  ): string {
    console.log(reason);
    this.scannerEnabled = false;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }else {
      return `with: ${reason}`;

    }
  }
  
}

interface Transport {
  plates: string;
  slot: Slot;
}

interface Slot {
  name: string;
  description: string;
}

export class Appointment {
  identifier: string = null;
  reason: string = null;

  constructor(identifier: string,reason: string ) {
    this.identifier = identifier;
    this.reason = reason;
  }
}

