import { iUserCommonDetails } from "../models/userModel";

export interface iCreateUserBodyDTO extends iUserCommonDetails {
  password: string;
}
export interface iUpdateUserBodyDTO extends iUserCommonDetails {}
export interface iIdParamsDTO {
  id: string;
}
