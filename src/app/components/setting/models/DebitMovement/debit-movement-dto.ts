import { BankAccountDto } from "src/app/components/setting/models/BankAccounts/bank-account-dto";
import { DebitMovementStatusDto } from "src/app/components/setting/models/DebitMovementStatus/debit-movement-status-dto";
import { DebitReasonDto } from "src/app/components/setting/models/DebitReason/debit-reason-dto";

export class DebitMovementDto {
    public debitMovementsId: string;
    public registerDate: Date;
    public debitDate: Date;
    public document: string;
    public value: number;
    public verifiedType: string;
    public image: string;
    public employeeReferenceId: string;
    public active: boolean;

    public debitMovementStatus : DebitMovementStatusDto;
    public bankAccount : BankAccountDto;
    public debitReasonDto : DebitReasonDto;
}
