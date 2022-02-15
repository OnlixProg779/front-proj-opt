import { CreditMovementStatusDto } from "src/app/components/setting/models/CreditMovementStatus/credit-movement-status-dto";
import { CreditReasonDto } from "src/app/components/setting/models/CreditReason/credit-reason-dto";
import { ClientDtoA } from "src/app/components/users/models/client-dto-a";
import { CreditMovementsImportedDtoA } from "../CreditMovementImported/credit-movements-imported-dto-a";

export class CreditMovementDtoA {
    public creditMovementsId: string;
        public registerDate: Date;
        public depositDate: Date;
        public document: string;
        public value: number;
        public verifiedType: string;
        public image: string;
        //public virtual BankAccountDto BankAccount { get; set; }
        public client: ClientDtoA;
        public creditMovementStatus:CreditMovementStatusDto;
        public creditMovementsImported: CreditMovementsImportedDtoA;
        public creditReasonDto: CreditReasonDto;
        public active: boolean;
}
