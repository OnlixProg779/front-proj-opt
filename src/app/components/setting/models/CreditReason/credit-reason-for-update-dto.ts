import { CreditReasonForManipulationDto } from "./credit-reason-for-manipulation-dto";

export interface CreditReasonForUpdateDto extends CreditReasonForManipulationDto{
    active: boolean;

}
