import { Role } from './Role';

export class UserSignup{
  constructor(
    public username:string,
    public fullName:string,
    public email: string,
    public password: string,
    public role:Role,
    public organizationName: string,
    public jobTitle?: string,
    public phoneNumber?: number,
    public about?: string){}
}
