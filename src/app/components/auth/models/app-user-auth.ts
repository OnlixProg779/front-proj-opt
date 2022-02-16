import { AppUserClaims } from './app-user-claims';

export class AppUserAuth {
    userName: string = '';
    userId: string = '';
    bearerToken: string = '';
    isAuthenticated: boolean = false;
    claims: AppUserClaims[] = [];
}