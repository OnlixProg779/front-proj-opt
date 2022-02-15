import { UserCreateDto } from "src/app/shared/models/user-create-dto";

export interface ClientCreateDto {
      clientId: string;
      firstName: string;
      lastName: string;
      instagramName: string;
      type: string;
      dateOfBirth: Date ;
      phone: string;
      gender: string;
      city:string ;
      dni:string ;
      password:string ;
      active: boolean;
      userId: string;

      user: UserCreateDto

}
