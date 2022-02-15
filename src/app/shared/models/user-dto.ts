import { AppUserClaims } from "src/app/components/auth/models/app-user-claims";

export class UserDto {
    public active: boolean;
    public userName: string;
    public password: string; 
    public userClaims: AppUserClaims[];
}
