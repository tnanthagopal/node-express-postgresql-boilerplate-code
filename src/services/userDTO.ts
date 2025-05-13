import { iUserDetails } from "../models/userModel";

//Add ServiceDTO postfix
export interface iUserServiceDTO extends iUserDetails {
  password: string;
}
