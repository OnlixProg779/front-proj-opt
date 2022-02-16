import { UserDto } from "src/app/shared/models/user-dto";
import { BankAccountDtoD } from "../../setting/models/BankAccounts/friendly/bank-account-dto-d";
import { CreditMovementStatusDto } from "../../setting/models/CreditMovementStatus/credit-movement-status-dto";
import { CreditReasonDto } from "../../setting/models/CreditReason/credit-reason-dto";
import { ClientDtoA } from "../../users/models/client-dto-a";

export class CreditMovementDto {
    public creditMovementsId: string;
    public registerDate: Date; //
    public depositDate: Date; //
    public document: string; //
    public value: number; //
    public verifiedType: string;//
    public image: string; //
    public bankAccount: BankAccountDtoD; //
    public user:UserDto; //
    public creditMovementStatus : CreditMovementStatusDto; //
    public creditReason:  CreditReasonDto;
    public active: boolean;
}
