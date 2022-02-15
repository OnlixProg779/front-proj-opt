import { DebitMovementDto } from "src/app/components/vendors/models/debitMovement/debit-movement-dto";
import { AccountTypeDto } from "../../AccountType/account-type-dto";
import { BankDto } from "../../Bank/bank-dto";

export class BankAccountDtoC {
    bankAccountId: string;
    accountNumber: string;
    accountAlias: string;
    employeeReferenceId: string;
    accountOwner: string;
    dniAccountOwner: string;
    active: boolean;

    accountType: AccountTypeDto;
    bank: BankDto;

    // public creditMovements: Array<CreditMovementDtoA>;
    public debitMovements: Array<DebitMovementDto>;
}
