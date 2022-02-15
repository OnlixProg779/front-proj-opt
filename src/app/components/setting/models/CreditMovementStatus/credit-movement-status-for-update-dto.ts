import { CreditMovementStatusForManipulationDto } from "./credit-movement-status-for-manipulation-dto";

export interface CreditMovementStatusForUpdateDto extends CreditMovementStatusForManipulationDto {

    active: boolean;

}
