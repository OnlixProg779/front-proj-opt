import { UserDto } from "src/app/shared/models/user-dto";
import { AccountTypeDto } from "../AccountType/account-type-dto";
import { BankDto } from "../Bank/bank-dto";

export interface BankAccountDto {
        bankAccountId: string;//
        accountNumber: string;
        accountAlias: string;
        // employeeReferenceId: string;//
        accountOwner: string;
        dniAccountOwner: string;
        active: boolean;//

        user: UserDto;
        userId: string;

        accountType: AccountTypeDto;
        bank: BankDto;
}


 