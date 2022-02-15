import { BankAccountDtoD } from "../../setting/models/BankAccounts/friendly/bank-account-dto-d";
import { CreditMovementStatusDto } from "../../setting/models/CreditMovementStatus/credit-movement-status-dto";
import { CreditReasonDto } from "../../setting/models/CreditReason/credit-reason-dto";
import { ClientDtoA } from "../../users/models/client-dto-a";
import { CreditMovementsImportedDtoA } from "./CreditMovementImported/credit-movements-imported-dto-a";

export class CreditMovementDto {
    public creditMovementsId: string;
    public registerDate: Date; //
    public depositDate: Date; //
    public document: string; //
    public value: number; //
    public verifiedType: string;//
    public image: string; //
    public bankAccount: BankAccountDtoD; //
    public client:ClientDtoA; //
    public creditMovementStatus : CreditMovementStatusDto; //
    public creditMovementsImported : CreditMovementsImportedDtoA;
    public creditReason:  CreditReasonDto;
    public active: boolean;
}
