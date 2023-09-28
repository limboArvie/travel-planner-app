import { UserLogin } from './user-login.model';

export class User extends UserLogin {
    id: number;
    fullName: string;
    email: string;
    mobileNumber: string;
    imgUrl: string;
}
