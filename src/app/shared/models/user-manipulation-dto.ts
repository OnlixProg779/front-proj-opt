import { AppUserClaims } from "src/app/components/auth/models/app-user-claims";

export class UserManipulationDto {
    public userName: string;
    public password: string; 
    public userClaims: AppUserClaims[] = [];
    public active: boolean;
    public userId: string;

}
