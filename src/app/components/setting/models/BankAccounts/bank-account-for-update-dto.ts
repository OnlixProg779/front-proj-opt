import { BankAccountForManipulationDto } from "./bank-account-for-manipulation-dto";

export class BankAccountForUpdateDto extends BankAccountForManipulationDto {
    active: boolean;
}
