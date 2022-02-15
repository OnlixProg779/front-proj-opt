import { CreditMovementDto } from "../credit-movement-dto";

export class CreditMovementsImportedDto {
    public creditMovementsImportedId: string;
    public date: Date;//
    public office: string;//
    public description: string;//
    public value: number;//
    public verified: boolean;//
    public document: string;//
    public bankIdReference: string;
    public active: boolean;//
    public creditMovement: CreditMovementDto;

}
