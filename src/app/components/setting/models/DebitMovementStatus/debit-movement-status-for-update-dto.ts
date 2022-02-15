import { DebitMovementStatusForManipulationDto } from "./debit-movement-status-for-manipulation-dto";

export interface DebitMovementStatusForUpdateDto extends DebitMovementStatusForManipulationDto{
    active: boolean;

}
