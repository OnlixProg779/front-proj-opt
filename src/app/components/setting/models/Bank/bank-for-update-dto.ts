import { BankForManipulationDto } from "./bank-for-manipulation-dto";

export interface BankForUpdateDto extends BankForManipulationDto {
    active: boolean;
}
