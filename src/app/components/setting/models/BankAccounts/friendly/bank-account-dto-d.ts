import { AccountTypeDto } from "../../AccountType/account-type-dto";
import { BankDto } from "../../Bank/bank-dto";

export class BankAccountDtoD {
    bankAccountId: string;
    accountNumber: string;
    accountAlias: string;
    // employeeReferenceId: string;
    accountOwner: string;
    dniAccountOwner: string;
    active: boolean;

    accountType: AccountTypeDto;
    bank: BankDto;

   
}
