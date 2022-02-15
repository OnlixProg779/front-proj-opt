import { DebitMovementForManipulationDto } from "./debit-movement-for-manipulation-dto";

export class DebitMovementForUpdateDto extends DebitMovementForManipulationDto{
    public verifiedType: string;
    public active: boolean;

}
