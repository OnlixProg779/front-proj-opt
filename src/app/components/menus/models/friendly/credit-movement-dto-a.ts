import { CreditMovementStatusDto } from "src/app/components/setting/models/CreditMovementStatus/credit-movement-status-dto";
import { CreditReasonDto } from "src/app/components/setting/models/CreditReason/credit-reason-dto";
import { ClientDtoA } from "src/app/components/users/models/client-dto-a";
import { UserDto } from "src/app/shared/models/user-dto";

export class CreditMovementDtoA {
    public creditMovementsId: string;
        public registerDate: Date;
        public depositDate: Date;
        public document: string;
        public value: number;
        public verifiedType: string;
        public image: string;
        //public virtual BankAccountDto BankAccount { get; set; }
        public user: UserDto;
        public creditMovementStatus:CreditMovementStatusDto;
        public creditReasonDto: CreditReasonDto;
        public active: boolean;
}
