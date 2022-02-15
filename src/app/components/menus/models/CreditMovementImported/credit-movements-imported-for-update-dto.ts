import { CreditMovementForManipulationDto } from "../credit-movement-for-manipulation-dto";

export class CreditMovementsImportedForUpdateDto extends CreditMovementForManipulationDto {
    public active: boolean;
    public verified: boolean;
}
