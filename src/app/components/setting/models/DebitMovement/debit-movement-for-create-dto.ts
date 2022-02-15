import { DebitMovementForManipulationDto } from "./debit-movement-for-manipulation-dto";

export class DebitMovementForCreateDto  extends DebitMovementForManipulationDto{
    public registerDate: Date;
}
