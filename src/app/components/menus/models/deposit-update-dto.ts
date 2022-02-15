import { DepositManipulationDto } from "./deposit-manipulation-dto";

export interface DepositUpdateDto extends DepositManipulationDto{
    depositId: string;
    active: boolean;
}
