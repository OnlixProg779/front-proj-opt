export class CreditMovementForManipulationDto {
        public depositDate: Date;
        public document: string;
        public value: number;
        public image: File;
 
        public bankAccountId: string;
        public creditReasonId: string;
        public creditMovementStatusId: string;
        public clientId: string;
}
