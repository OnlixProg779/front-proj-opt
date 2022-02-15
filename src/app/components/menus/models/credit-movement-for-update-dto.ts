import { CreditMovementForManipulationDto } from "./credit-movement-for-manipulation-dto";

export class CreditMovementForUpdateDto extends CreditMovementForManipulationDto{

    public active: boolean;
    public verifiedType: string;
    public creditMovementsImportedId : string;

}
