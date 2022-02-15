import { DebitReasonForManipulationDto } from "./debit-reason-for-manipulation-dto";

export interface DebitReasonForUpdateDto extends DebitReasonForManipulationDto{
    active: boolean;

}
