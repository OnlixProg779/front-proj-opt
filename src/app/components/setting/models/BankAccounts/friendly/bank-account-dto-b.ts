import { CreditMovementDtoA } from "src/app/components/menus/models/friendly/credit-movement-dto-a";
import { AccountTypeDto } from "../../AccountType/account-type-dto";
import { BankDto } from "../../Bank/bank-dto";

export class BankAccountDtoB {
    bankAccountId: string;
    accountNumber: string;
    accountAlias: string;
    employeeReferenceId: string;
    accountOwner: string;
    dniAccountOwner: string;
    active: boolean;

    accountType: AccountTypeDto;
    bank: BankDto;

    public creditMovements: Array<CreditMovementDtoA>;
    // public debitMovements: Array<DebitMovementDto>;
}
